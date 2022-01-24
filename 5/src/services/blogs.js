import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blog'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (data, token) => {
  try {
    const config = { headers: { Authorization: `bearer ${token}` } }
    const response = await axios.post(baseUrl, data, config)
    return response.data
  } catch(e) {
    console.log(e)
  }
  
}

export default { getAll, addBlog }