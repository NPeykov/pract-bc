const Blog = require("../models/blog");

async function showAllBlogs(request, response) {
  const blogs = await Blog.find({})
  response.json(blogs);
}

async function addNewBlog(request, response) {
  const blog = new Blog(request.body);

  const result = await blog.save()
  response.status(201).json(result);
}

module.exports = { showAllBlogs, addNewBlog }