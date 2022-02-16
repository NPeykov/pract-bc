import React from 'react';
import counterReducer from './reducer/counterReducer'
import { createStore } from 'redux'
import ReactDOM from 'react-dom';

const store = createStore(counterReducer)
function App() {

	return (
		<div>
			<div>
				<label> bad: {store.getState().bad} </label>
				<label> good: {store.getState().good} </label>
				<label> ok: {store.getState().ok} </label>
			</div>
			<button onClick={() => store.dispatch({ type: 'BAD' })}> bad </button>
			<button onClick={() => store.dispatch({ type: 'GOOD' })}> good </button>
			<button onClick={() => store.dispatch({ type: 'OK' })}> ok </button>
		</div>
	);
}

const render = () => ReactDOM.render(
	<App />,
	document.getElementById('root')
);

render()

store.subscribe(render)

export default App;
