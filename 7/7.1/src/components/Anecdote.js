const Anecdote = ({ anecdote }) => {
	return (
		<h3>{anecdote.content} - {anecdote.author}</h3>
	)
}

export default Anecdote
