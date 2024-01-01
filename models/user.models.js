import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  imageId: { type: String },
})

const User = mongoose.model('User', UserSchema)

export default User
