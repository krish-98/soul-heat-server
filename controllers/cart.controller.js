import { stripe } from '../index.js'

export const addItemsToCart = async (req, res) => {
  try {
    const cartDetails = await CartItems.create(req.body)

    if (!cartDetails) {
      throw new Error('May be the data you are sending is not a valid format')
    }
    res.status(201).json(cartDetails)
  } catch (error) {
    console.error(error)
  }
}

export const checkout = async (req, res) => {
  const { cartItems } = req.body

  try {
    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [`${process.env.CLOUDINARY_URL}${item.imageId}`],
          },
          unit_amount: Math.round(
            item.price || item.defaultPrice + item.quantity
          ),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      submit_type: 'pay',
      billing_address_collection: 'auto',
      // shipping_options: [{ shipping_rate: 'shr_1NeFaFSBzzrld9LFwwmTon9O' }],
    })

    res.json({ id: session.id })
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
}
