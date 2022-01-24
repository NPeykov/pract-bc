import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const session = window.localStorage.getItem('userSession')
    if(!session) {
      return
    }
    const userParsed = JSON.parse(session)
    setUser(userParsed)
    setToken(userParsed.token)
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('userSession')
    setUser(null)
    setToken('')
  }

  const renderBlogs = () => {
    return (
      <div>
        <label>Hi {user.user_name}, you're logged in</label>
        <button onClick={handleLogout}>Log out</button>
        {blogs.map(blog => <Blog key={blog._id} blog={blog}/> )}
      </div>
    )
  }

  return (                                                                                                                                        
    <div>
      <h2>blogs</h2>
      {
      user !== null ?
      renderBlogs()
      :
      <Login setUser={setUser} setToken={setToken}/>
      }
      
    </div>
  )
}

export default App