const blogRouter = require("express").Router();
const controller = require("../controllers/blog");

blogRouter.use((request, response, next) => {
    console.log('ENTRE AQUI XJEJE')
    next()
})

blogRouter.get('/api/blogs/', controller.showAllBlogs)

blogRouter.post('/api/blogs/', controller.addNewBlog)

module.exports = blogRouter;
