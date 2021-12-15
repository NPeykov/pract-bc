import React from 'react'
import ReactDOM from 'react-dom'

//content
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const Header = (props) => {
  return <h1>Half Stack application development</h1>
}

const Part = (props) => {
  return (
      <p>
        {props.message} {props.total}
      </p>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Part message = {part1} total = {exercises1}/>
      <Part message = {part2} total = {exercises2}/>
      <Part message = {part3} total = {exercises3}/>
      <Part message = 'Number of exercises' total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))