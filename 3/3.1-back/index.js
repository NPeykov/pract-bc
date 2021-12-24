const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("express/lib/response");

const app = express();
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

morgan.token('body', function postBodyReq (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :body', {
  skip: function (req, res) { return req.method !== 'POST' }
}))

//controllers

app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/notes", (request, response) => {
  response.json(notes);
});

app.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ error: "note not found" }).end();
  }
});

app.delete("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).send();
});

app.post("/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId()
  }
  notes = [...notes, note]
  response.json(note)
});


app.put("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const noteToUpdate = request.body;
  if(!noteToUpdate.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  notes = notes.map(note => note.id === id ? noteToUpdate : note)
  response.json(noteToUpdate)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
