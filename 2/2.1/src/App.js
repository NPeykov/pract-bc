import React, { useState } from 'react'

const INITIAL_PERSONS = [
  { name: 'Arto Hellas' },
  { name: 'Tom Hendrix' }
]

const Persons = ({persons}) => {
  return (
    persons.map((person) => {
      return <p>{person.name}</p>
    })
  );
}

const App = () => {
  const [ persons, setPersons ] = useState(INITIAL_PERSONS) 
  const [ newName, setNewName ] = useState('')

  function fillNameHandler(event) {
    let actualText = event.currentTarget.value
    setNewName(actualText)
  }
  
  function addButtonHandler(event) {
    event.preventDefault()
    let newPerson = { name: newName }
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange = {fillNameHandler} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick = {addButtonHandler}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App