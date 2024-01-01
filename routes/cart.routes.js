import { Router } from 'express'
import { addItemsToCart, checkout } from '../controllers/cart.controller.js'

const router = Router()

// router.post('/cart-items', addItemsToCart)
router.post('/checkout-payment', checkout)

export default router
