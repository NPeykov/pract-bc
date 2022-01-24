import React, { useEffect, useState } from 'react'
import AddBlog from './AdddBlog'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ setLogout, user }) => {
  const [blogs, setBlogs] = useState([])
  const [toggleForm, setToggleForm] = useState(false)

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
      {toggleForm === true ?
      (
      <>
        <AddBlog token={user.token} setBlogs={setBlogs}/>
        <button onClick={() => setToggleForm(false)}>Cancel</button>
      </>
      )
      :
      <button onClick={() => setToggleForm(true)}>Add new blog</button>
      }
      <br/>
      {blogs.map(blog => <Blog key={blog._id} blog={blog}/> )}
    </div>
  )
}

export default Blogs