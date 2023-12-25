const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

// app.use(cors())
app.use(express.static('public'))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/api', (req, res) => {
  console.log(req)
  res.send('Hola from server!')
})

app.post('/checkout-payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [{ shipping_rate: 'shr_1NeFaFSBzzrld9LFwwmTon9O' }],
      line_items: req?.body?.map((item) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.name,
              images: [`${process.env.CLOUDINARY_URL}${item.imageId}`],
            },
            unit_amount: (item.price || item.defaultPrice) + item.quantity,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    })

    res.status(200).json(session.id)
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
})

app.use(
  '/api/restaurants',
  createProxyMiddleware({
    target: 'https://www.swiggy.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/restaurants':
        '/dapi/restaurants/list/v5?lat=9.928668&lng=78.092783&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING',
    },
  })
)

app.use(
  '/api/restaurant/menu',
  createProxyMiddleware({
    target: 'https://www.swiggy.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/restaurant/menu': '/dapi/menu/pl',
    },
    // Modify the proxy request to include query parameters
    onProxyReq(proxyReq, req) {
      if (req.query) {
        const query = Object.keys(req.query)
          .map((key) => `${key}=${encodeURIComponent(req.query[key])}`)
          .join('&')
        proxyReq.path += `?${query}`
      }
    },
  })
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
