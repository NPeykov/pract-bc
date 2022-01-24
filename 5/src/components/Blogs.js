import React, { useEffect, useState } from 'react'
import AddBlog from './AdddBlog'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ setLogout, user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('userSession')
    setLogout(null)
  }

  return (
    <div>
      <div>
        <label>Hi {user.user_name}, you're logged in</label>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <br/>
      <AddBlog token={user.token} setBlogs={setBlogs}/>
      <br/>
      {blogs.map(blog => <Blog key={blog._id} blog={blog}/> )}
    </div>
  )
}

export default Blogs