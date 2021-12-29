require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.DB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });
