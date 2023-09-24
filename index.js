const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.static("public"))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hola from server!")
})

app.post("/checkout-payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NeFaFSBzzrld9LFwwmTon9O" }],
      line_items: req?.body?.map((item) => {
        return {
          price_data: {
            currency: "inr",
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
