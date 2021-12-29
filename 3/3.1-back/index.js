require("./mongo");

const express = require("express");
const cors = require("cors");
const { json } = require("express/lib/response");
const app = express();
const Note = require("./app_schemas/Note");
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const postWatcher = require('./middleware/postWatcher')

app.use(express.json());
app.use(cors());
app.use(postWatcher)

//controllers

app.get("/", (request, response) => {
  response.send("<h1>Welcome, u might want to visit /notes</h1>");
});

app.get("/notes/:id", (request, response, next) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({ error: "note not found" }).end();
      }
    })
    .catch(err => {
      next(err)
    })
});

app.get("/notes", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch(err => {
      next(err)
    })
});

app.delete("/notes/:id", (request, response, next) => {
  const id = request.params.id;

  Note.findByIdAndRemove(id)
    .then(() => {
      response.status(204).send();
    })
    .catch(err => {
      next(err)
    })
});

app.post("/notes", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save()
    .then((newNote) => {
      response.json(newNote);
    })
    .catch(err => {
      next(err)
    })
});

app.put("/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const note = request.body;

  if (!note.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((newNote) => {
      response.json(newNote);
    })
    .catch(err => {
      next(err)
    })
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
