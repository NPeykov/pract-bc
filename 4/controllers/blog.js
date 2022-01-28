const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

async function showAllBlogs(request, response) {
  const blogs = await Blog.find({}).populate("user", { __v: 0, password: 0 })
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

async function replaceBlog(request, response) {
	const body = request.body
	const blogId = request.params.id
	if(!ObjectId.isValid(blogId)) {
		return response.status(500).send({ error: 'invalid id' })
	}
	const savedBlog = await Blog.findById(blogId)
	const newBlog = {...body, user: ObjectId(body.user) }
	if(savedBlog.user.toString() !== body.user) {
		return response.status(401).send({ error: 'you do not have permission'})
	}
	const data = await Blog.findOneAndReplace(
		{ _id: blogId },
		body,
		{ new: true }
	)
	return response.status(200).json(data)
}
  
module.exports = { showAllBlogs, addNewBlog, replaceBlog }
