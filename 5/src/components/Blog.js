import React from 'react'
import Toggable from '../components/Toggable'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, setBlogs })=> {

	function updateBlogs(oldBlogs) {
		const newBlog = { ...blog, likes: blog.likes + 1 }
		return oldBlogs.map(_blog => _blog === blog ? newBlog : _blog)
	}

  function handleLikeButton() {
    blogService
      .likeBlog(blog)
			.then(response => {
				setBlogs(prevValues => updateBlogs(prevValues))
			})
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <Toggable toHideText='hide' toViewText='show info'>
        <div>
          <label>likes: {blog.likes}</label>
          <button onClick={handleLikeButton}>like</button>
        </div>
        <p>url: {blog.url}</p>
      </Toggable>
    </div>
  )
}


export default Blog
