const User = require('../models/user')

const initialUsers = [
  {
    name: "Mik",
    user_name: "_Fir_",
    password: "good_password"
  }
]

async function saveUser(_user) {
  const user = new User(_user)
  return await user.save()
}

module.exports = { initialUsers, saveUser }