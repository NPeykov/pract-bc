import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const NewAnecdote = () => {
	const dispatch = useDispatch()

	const handleNewNote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createNewAnecdote(content))
		dispatch(notify(`you created: ${content}`, 5))
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
