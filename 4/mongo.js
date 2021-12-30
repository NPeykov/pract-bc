const mongoose = require("mongoose");

const mongoUrl = process.env.DB_URI;

const openDatabaseConection = () =>
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected to database successfully"));

module.exports = openDatabaseConection