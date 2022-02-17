import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdotes = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()
	
	const handleVote = (id) => {
		const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
		dispatch(vote(votedAnecdote.id, votedAnecdote.votes))
		dispatch(notify(`you voted: ${votedAnecdote.content}`, 5))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Anecdotes
