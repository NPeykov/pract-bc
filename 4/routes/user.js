const userRouter = require('express').Router()
const controller = require('../controllers/user')

userRouter.get('/', controller.showAllUsers)
userRouter.post('/', controller.createUser)

module.exports = userRouter