const initialState = ''

const notificationReducer = (state = initialState, action) => {
	switch(action.type){
		case 'notification/notify':
			return 'you voted: ' + action.payload 
		case 'notification/reset':
			return initialState
		default:
			return state
	}
}

export const notify = (anecdote) => {
	return {
		type: 'notification/notify',
		payload: anecdote
	}
}

export default notificationReducer
