import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import mongoose from 'mongoose'
// import CartItems from './models/cartItems.models.js'

import restaurantRouter from './routes/restaurant.routes.js'
import cartRouter from './routes/cart.routes.js'

dotenv.config()
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/restaurant', restaurantRouter)
app.use('/api/cart', cartRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connection established')

    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
