import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdotes'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		getAll().then(data => dispatch(initializeAnecdotes(data)))
	}, [])

  return (
    <div>
			<Notification />
			<Anecdotes />
			<NewAnecdote />
    </div>
  )
}

export default App
