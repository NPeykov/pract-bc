const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
})

const Blog = mongoose.model('User', userSchema)

module.exports = Blog