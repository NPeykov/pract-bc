const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

async function showAllBlogs(request, response) {
  const blogs = await Blog.find({}).populate("user", { __v: 0, _id: 0, password: 0 })
  response.json(blogs);
}

async function addNewBlog(request, response) {
  const body = request.body;
  const data = jwt.decode(request.token, process.env.SECRET)

  if(!request.token || !data) {
    return response.status(400).send({ error: 'token missing or invalid' })
  }

  const user = await User.findById(data.id)
  const newBlog = {...body, user: user.id }
  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result);
}

module.exports = { showAllBlogs, addNewBlog }