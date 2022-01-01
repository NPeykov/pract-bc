const mongoose = require("mongoose");

const mongoUrl = process.env.NODE_ENV == "test" ? process.env.DB_URI_TEST : process.env.DB_URI  

const openDatabaseConection = () =>
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected to database successfully"))
    .catch((e) => console.error("Couldn't connect to db:", e.message))

module.exports = openDatabaseConection