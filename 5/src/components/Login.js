import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (event) => {
    event.preventDefault()
    const _user = await loginService.login(username, password)
    setUser(_user)
    window.localStorage.setItem('userSession', JSON.stringify(_user))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={loginHandler}>
        <input type='text' placeholder='username' onChange={({ target }) => setUsername(target.value)}/>
        <input type='text' placeholder='password' onChange={({ target }) => setPassword(target.value)}/>
        <button>Log in</button>
      </form>
    </>
  )

}


export default Login