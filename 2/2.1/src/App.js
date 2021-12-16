import React, { useState } from "react";

const INITIAL_PERSONS = [
  { name: "Arto Hellas", phone: "011-451242" },
  { name: "Tom Hendrix", phone: "011-425748" },
];

const Persons = ({ persons, filter }) => {
  let personsToRender = persons.filter((p) => p.name.includes(filter));
  return personsToRender.map((person) => {
    return (
      <p key={person.name}>
        {person.name} {person.phone}
      </p>
    );
  });
};

function nameIsTaken(persons, newName) {
  return persons.some((person) => person.name === newName.name);
}

const App = () => {
  const [persons, setPersons] = useState(INITIAL_PERSONS);
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filterText, setFilterText] = useState("");

  function fillNameHandler(event) {
    let actualText = event.currentTarget.value;
    setNewPerson({ ...newPerson, name: actualText });
  }

  function fillPhoneHandler(event) {
    let actualPhone = event.currentTarget.value;
    setNewPerson({ ...newPerson, phone: actualPhone });
  }

  function addButtonHandler(event) {
    event.preventDefault();
    if (nameIsTaken(persons, newPerson)) {
      window.alert(`${newPerson.name} is already taken`);
    } else {
      setPersons([...persons, newPerson]);
    }
    setNewPerson({ name: "", phone: "" });
  }

  function filterPerson(event) {
    let filterText = event.currentTarget.value;
    setFilterText(filterText);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={filterPerson} />
      <h2>Add new person</h2>
      <form>
        <div>
          name: <input onChange={fillNameHandler} value={newPerson.name} />
        </div>
        <div>
          phone: <input onChange={fillPhoneHandler} value={newPerson.phone} />
        </div>
        <div>
          <button type="submit" onClick={addButtonHandler}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterText} />
    </div>
  );
};

export default App;
