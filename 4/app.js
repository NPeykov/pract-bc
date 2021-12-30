require('dotenv').config()

const openDatabaseConection = require('./mongo')
const express = require('express')
const blogRouter = require('./routes/blog')
const app = express()
const cors = require('cors')

openDatabaseConection()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h3>HIII</h3>')
})

app.get('/api/blogs', blogRouter)

/*
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/

module.exports = app