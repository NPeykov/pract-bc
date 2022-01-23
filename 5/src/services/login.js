import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/login'

const login = async (user_name, password) => {
  const response = await axios.post(baseUrl, { user_name, password })
  console.log(response.data)
  return response.data
}

export default { login }