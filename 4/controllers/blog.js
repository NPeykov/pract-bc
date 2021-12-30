const Blog = require("../models/blog");

function showAllBlogs(request, response) {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
}

function addNewBlog(request, response) {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
}

module.exports = { showAllBlogs, addNewBlog }