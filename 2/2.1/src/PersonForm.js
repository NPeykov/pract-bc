import React, { useState } from "react";
import { addPerson, updatePerson } from "./services/personsAPI";

export const PersonForm = ({ persons, setPersons }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const fillNameHandler = (event) => {
    let actualText = event.currentTarget.value;
    setNewPerson({ ...newPerson, name: actualText });
  }

  function fillPhoneHandler(event) {
    let actualPhone = event.currentTarget.value;
    setNewPerson({ ...newPerson, number: actualPhone });
  }

  function addButtonHandler(event) {
    event.preventDefault();
    if (nameIsTaken(persons, newPerson)) {
      replaceNumber(newPerson)
    } else {
      newPerson["id"] = getMaxId() + 1
      addPerson(newPerson).then((person) => {
        setPersons([...persons, person])
      });
    }
    setNewPerson({ name: "", number: "" });
  }

  function replaceNumber(newPerson) {
    if(window.confirm(`${newPerson.name} already exists, overwrite phone?`)) {
      const personToBeReplaced = persons.find(person => person.name === newPerson.name)
      updatePerson(personToBeReplaced.id, newPerson).then((person) => {
        setPersons(prevV => prevV.map(p => p.id !== person.id ? p : person))
      })
    }
  } 

  function getMaxId() {
    const ids = persons.map(person => person.id)
    return Math.max(...ids);
  }

  function nameIsTaken(persons, newName) {
    return persons.some((person) => person.name === newName.name);
  }

  return (
    <>
      <h2>Add new person</h2>
      <form>
        <div>
          name: <input onChange={fillNameHandler} value={newPerson.name}/>
        </div>
        <div>
          number: <input onChange={fillPhoneHandler} value={newPerson.number} />
        </div>
        <div>
          <button type="submit" onClick={addButtonHandler}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
