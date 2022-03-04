import { useState } from 'react'
import { useMutation } from '@apollo/client'
import LOGIN from '../queries/login'

const Login = ({ show, setToken, setPage }) => {
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [login] = useMutation(LOGIN)

  if(!show) return null

  const handleLogin = async (event) => {
    event.preventDefault()

    const response = await login({ variables: {
        username: name,
        password: pw
    }})
    const token = response.data.login.value
    window.localStorage.setItem('books-user-token', token)
    setToken(token)
    setPage('authors')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input placeholder='username' onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        password
        <input placeholder='password' onChange={(e) => setPw(e.target.value)}/>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login

