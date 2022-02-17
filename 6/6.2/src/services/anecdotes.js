import axios from 'axios'

const baseUrl = 'http://localhost:4000/anecdotes'

export async function getAll() {
	const { data } = await axios.get(baseUrl)
	return data
}

export async function createAnecdote(content) {
	const newAnecdote = {
		content: content,
		votes: 0
	}
	const { data } = await axios.post(baseUrl, newAnecdote)
	return data
}

export async function voteAnecdote(id, votes) {
	const dataToPatch = { votes: votes + 1 }
	const { data } = await axios.patch(`${baseUrl}/${id}`, dataToPatch)
	return data
}
