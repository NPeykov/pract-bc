require('dotenv').config()

const mongoose = require("mongoose");
const url = process.env.DB_URI;

mongoose.connect(url).catch((err) => console.error(err));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log(result);
  mongoose.connection.close();
});
