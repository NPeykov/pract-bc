require('dotenv').config()

const openDatabaseConection = require('./mongo')
const express = require('express')
const tokenExtractor = require('./middleware/tokenExtractor')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const app = express()
const cors = require('cors')

openDatabaseConection()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.get('/', (request, response) => {
    response.send('<h3>Main page :)</h3>')
})

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

module.exports = app