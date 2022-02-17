import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
	const dispatch = useDispatch()

	const handleNewNote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createNewAnecdote(content))
	}

	return (
		<div>
      <h2>create new</h2>
      <form onSubmit={ handleNewNote }>
        <div>
					<input name='anecdote' />
				</div>
        <button>create</button>
      </form>
		</div>
	)
}

export default NewAnecdote
