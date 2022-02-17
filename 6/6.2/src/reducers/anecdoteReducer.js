const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'anecdote/add':
			return [...state, action.payload]
		case 'anecdote/vote':
			return handleAnecdoteVote(state, action.payload.id)
		case 'anecdote/initialize':
			return action.payload
		default:
			return state
	}
}

const handleAnecdoteVote = (anecdotes, id) => {
	return anecdotes.map(a => a.id !== id ? a : {...a, votes: a.votes + 1})
}

export const createNewAnecdote = (anecdote) => {
	return {
		type: 'anecdote/add',
		payload: anecdote 
	}
}

export const vote = (id) => {
	return {
		type: 'anecdote/vote',
		payload: { id }
	}
}

export const initializeAnecdotes = (data) => {
	return {
		type: 'anecdote/initialize',
		payload: data
	}
}

export default anecdoteReducer
