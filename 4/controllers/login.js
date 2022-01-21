const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

async function createSession(request, response) {
  const { user_name, password } = request.body
  const user = await User.findOne({ user_name: user_name })
  
  const passwordCorrect = user === null ?
    false
    :
    await bcrypt.compare(password, user.password)
  
  if(!passwordCorrect) {
    return response.status(401).send({ error: "username or password incorrect" })
  }

  const userToken = { id: user._id, password: user.password }
  const token = jwt.sign(userToken, process.env.SECRET)
  response.status(200).send({ token: token, user_name: user.user_name, name: user.name })
}

module.exports = { createSession }