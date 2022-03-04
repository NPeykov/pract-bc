import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
})

export default mongoose.model('User', schema)
