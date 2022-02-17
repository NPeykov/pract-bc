import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({ 
	notification: notificationReducer, 
	anecdotes: anecdoteReducer 
})

const store = createStore(reducer, composeWithDevTools())

const clearTimer = () => setTimeout( () => {
	store.dispatch({ type: 'notification/reset' })
}, 5000 )

store.subscribe(clearTimer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
