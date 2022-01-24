import React from 'react'
import Toggable from '../components/Toggable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  

  return (
    <div style={blogStyle}>
    {blog.title} - {blog.author}
    <Toggable toHideText='hide' toViewText='show info'>
      <p>likes: {blog.likes}</p>
      <p>url: {blog.url}</p>
    </Toggable>
    </div>
  )
}


export default Blog
