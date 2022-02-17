import { getAll, createAnecdote, voteAnecdote } from "../services/anecdotes"

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

export const createNewAnecdote = (content) => {
	return async (dispatch) => {
		const anecdote = await createAnecdote(content) 
		dispatch({
			type: 'anecdote/add',
			payload: anecdote 
		})
	}
}

export const vote = (id, actualLikes) => {
	return async (dispatch) => {
		await voteAnecdote(id, actualLikes)
		dispatch({
			type: 'anecdote/vote',
			payload: { id }
		})
	}
}

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await getAll()
		dispatch({
			type: 'anecdote/initialize',
			payload: anecdotes
		})
	}
}

export default anecdoteReducer
