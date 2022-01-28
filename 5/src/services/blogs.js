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

const likeBlog = async (blog) => {
  try {
    const url = baseUrl + `/${blog._id}`
		let data = {
			...blog,
			user: blog.user._id,
			likes: blog.likes + 1
		}
		delete data._id
		const response = await axios.put(url, data)
    return response.data
  } catch(e) {
    console.log(e)
  }
}

export default { getAll, addBlog, likeBlog }
