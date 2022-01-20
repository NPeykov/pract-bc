const User = require('../models/user')
const bcrypt = require('bcrypt')

async function showAllUsers(request, response) {
  const users = await User.find({})
  response.json(users)
}

async function createUser(request, response) {
  const { name, user_name, password } = request.body
  const hashedPassword = await bcrypt.hash(password, 10)
  
  if(user_name.length <= 3 || password.length <= 3) {
    return response.status(400).send({ error: "bad request :(" })
  }

  const user = new User({
    user_name: user_name,
    name: name,
    password: hashedPassword
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
}

module.exports = { showAllUsers, createUser }