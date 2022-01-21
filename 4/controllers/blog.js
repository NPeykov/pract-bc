const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

async function showAllBlogs(request, response) {
  const blogs = await Blog.find({}).populate("user", { __v: 0, _id: 0, password: 0 })
  response.json(blogs);
}

async function addNewBlog(request, response) {
  const body = request.body;
  const token = obtainToken(request)
  const data = jwt.decode(token, process.env.SECRET)

  if(!token || !data.id) {
    return response.status(400).send({ error: 'token missing or invalid' })
  }

  const user = await User.findById(data.id)
  const newBlog = {...body, user: user.id }
  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result);
}

function obtainToken(request) {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.split(' ')[1]
  }
  return null
}

module.exports = { showAllBlogs, addNewBlog }