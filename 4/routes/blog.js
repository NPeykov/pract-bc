const blogRouter = require("express").Router();
const controller = require("../controllers/blog");

blogRouter.get('/', controller.showAllBlogs)
blogRouter.post('/', controller.addNewBlog)
blogRouter.put('/:id', controller.replaceBlog)

module.exports = blogRouter;
