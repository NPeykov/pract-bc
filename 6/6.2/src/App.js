import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnecdotes())
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
