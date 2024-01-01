import { Router } from 'express'
import {
  allRestaurants,
  restaurantInfo,
} from '../controllers/restaurant.controller.js'

const router = Router()

router.get('/restaurants', allRestaurants)
router.get('/restaurant/:id', restaurantInfo)

export default router
