import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    const _user = await loginService.login(username, password)
    setUser(_user)
    setToken(_user.token)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>blogs</h2>
      {
      user !== null ? 
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
      :
      <form onSubmit={loginHandler}>
        <input type='text' placeholder='username' onChange={({ target }) => setUsername(target.value)}/>
        <input type='text' placeholder='password' onChange={({ target }) => setPassword(target.value)}/>
        <button>Log in</button>
      </form> 
      }
      
    </div>
  )
}

export default App