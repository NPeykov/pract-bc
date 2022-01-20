require('dotenv').config()

const openDatabaseConection = require('./mongo')
const express = require('express')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
const app = express()
const cors = require('cors')

openDatabaseConection()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h3>Main page :)</h3>')
})

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

module.exports = app