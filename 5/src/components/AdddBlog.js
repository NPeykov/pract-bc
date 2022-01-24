import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ token, setBlogs, hideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url, likes: Number(likes) }
    blogService.addBlog(newBlog, token).then((response) => {
      setBlogs((previousBlogs) => [...previousBlogs, response])
    })
    resetFormValues()
    hideForm.toggleVisibility()
  }

  const resetFormValues = () => {
    setTitle('')
    setAuthor('')
    setLikes('')
    setUrl('')
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        <label>Title: </label>
        <input type='text' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        <label>Author: </label>
        <input type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        <label>Likes: </label>
        <input type='number' placeholder='likes' value={likes} onChange={({ target }) => setLikes(target.value)}/>
      </div>
      <div>
        <label>Url: </label>
        <input type='text' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type='submit'>Create Blog</button>
    </form>
  )
}

export default AddBlog