import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { createAnecdote } from '../services/anecdotes'

const NewAnecdote = () => {
	const dispatch = useDispatch()

	const handleNewNote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await createAnecdote(content)
		dispatch(createNewAnecdote(newAnecdote))
		dispatch(notify(content))
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
