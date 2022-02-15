const Blog = require("../models/blog")
const User = require("../models/user")

async function resetDB(request, response) {
	await Blog.deleteMany({ })
	await User.deleteMany({ })

	response.status(200).end()
}

module.exports = { resetDB }
