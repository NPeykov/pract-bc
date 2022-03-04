import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URI = process.env.DB_URI 

mongoose
  .connect(URI)
  .then(() => console.log("connected to db"))
  .catch(() => console.log("could not connect to db"))
