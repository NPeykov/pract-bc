import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = window.localStorage.getItem('userSession')
    if(!session) {
      return
    }
    const userParsed = JSON.parse(session)
    setUser(userParsed)
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {
        user !== null ?
          <Blogs setLogout={setUser} user={user} />
          :
          <Login setUser={setUser} />
      }

    </div>
  )
}

export default App