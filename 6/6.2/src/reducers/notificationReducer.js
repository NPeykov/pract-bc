const initialState = ''

const notificationReducer = (state = initialState, action) => {
	switch(action.type){
		case 'notification/notify':
			return action.payload 
		case 'notification/reset':
			return initialState
		default:
			return state
	}
}

const resetNotification = () => {
	return {
		type: 'notification/reset'
	}
}

export const notify = (notification, time) => {
	return async (dispatch) => {
		dispatch({
			type: 'notification/notify',
			payload: notification
		})
		
		setTimeout(() => {
			dispatch(resetNotification())
		}, time * 1000)
	}
}

export default notificationReducer
