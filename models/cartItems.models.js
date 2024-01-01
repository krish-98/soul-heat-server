import { Schema, model } from 'mongoose'

// const CartSchema = new Schema({
//   name: { type: String },
//   description: { type: String },
//   imageId: { type: String },
//   price: { type: Number },
//   //   totalItems: { type: Number },
//   //   totalAmount: { type: Number },
// })

const CartSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variants: {
    type: Object,
    default: {},
  },
  variantsV2: {
    type: Object,
    default: {},
  },
  itemAttribute: {
    vegClassifier: {
      type: String,
    },
  },
  ribbon: {
    text: {
      type: String,
    },
    textColor: {
      type: String,
    },
    topBackgroundColor: {
      type: String,
    },
    bottomBackgroundColor: {
      type: String,
    },
  },
  type: {
    type: String,
    required: true,
  },
  itemBadge: {
    type: Object,
    default: {},
  },
  badgesV2: {
    type: Object,
    default: {},
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
  ratings: {
    aggregatedRating: {
      rating: {
        type: String,
      },
      ratingCount: {
        type: String,
      },
      ratingCountV2: {
        type: String,
      },
    },
  },
})

const CartItems = model('CartItems', CartSchema)

export default CartItems
