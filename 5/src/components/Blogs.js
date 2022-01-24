import React, { useEffect, useState, useRef } from 'react'
import AddBlog from './AdddBlog'
import Blog from './Blog'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blogs = ({ setLogout, user }) => {
  const [blogs, setBlogs] = useState([])
  const toggleRef = useRef()

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
      <Toggable text={'Add new note'} ref={toggleRef}>
        <AddBlog token={user.token} setBlogs={setBlogs} hideForm={toggleRef.current}/>
      </Toggable>
      <br/>
      {blogs.map(blog => <Blog key={blog._id} blog={blog}/> )}
    </div>
  )
}

export default Blogs