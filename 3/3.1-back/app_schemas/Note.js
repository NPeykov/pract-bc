const mongoose = require('mongoose');
 
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model("Note", noteSchema);

/*
const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log(result);
  mongoose.connection.close();
});
*/

module.exports = Note
