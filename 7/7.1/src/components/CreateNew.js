import useCreateField from '../hooks/useCreateField'

const CreateNew = ({ addNew }) => {
	const content = useCreateField('content')
	const author = useCreateField('author')
	const info = useCreateField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
			content: content.fields.value,
      author: author.fields.value,
      info: info.fields.value,
      votes: 0
    })
  }

	const handleReset = (event) => {
		event.preventDefault()
		content.reset()
		author.reset()
		info.reset()
	}

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <button>create</button>
				<button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
