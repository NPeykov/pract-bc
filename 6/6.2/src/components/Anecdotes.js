import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { voteAnecdote } from '../services/anecdotes'

const Anecdotes = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()
	
	const handleVote = async (id) => {
		const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
		const response = await voteAnecdote(id, votedAnecdote.votes)
		dispatch(vote(votedAnecdote.id))
		dispatch(notify(votedAnecdote.content))
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
