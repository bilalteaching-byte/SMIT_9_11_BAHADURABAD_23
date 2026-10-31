import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Force email to lower case to avoid 'Test@io' vs 'test@io' duplicates
    trim: true, // Remove accidental leading/trailing spaces
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

export default User
