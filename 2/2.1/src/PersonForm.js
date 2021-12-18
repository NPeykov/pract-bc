import React, { useState } from "react";

export const PersonForm = ({ persons, setter }) => {
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
      window.alert(`${newPerson.name} is already taken`);
    } else {
      newPerson["id"] = persons.length + 1
      console.log(newPerson)
      setter([...persons, newPerson]);
    }
    setNewPerson({ name: "", number: "" });
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
