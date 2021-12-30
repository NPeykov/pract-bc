require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const openDatabaseConection = require('./mongo')

openDatabaseConection()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h3>HIII</h3>')
})

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
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})