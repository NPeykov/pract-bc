const loginRouter = require('express').Router()
const controller = require('../controllers/login')

loginRouter.post('/', controller.createSession)

module.exports = loginRouter