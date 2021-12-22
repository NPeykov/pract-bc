import { deletePerson } from "./services/personsAPI";

const Persons = ({ persons, filterText, setPersons}) => {
  const personsToRender = () => persons.filter((p) => p.name.includes(filterText));
  
  function deleteButtonHandler (id) {
    if(window.confirm('Are u sure?')) {
      deletePerson(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(p => p.id!==id))
      })
    }
  }
  
  return (
    <>
      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>"CARGANDO..."</p>
      ) : (
        personsToRender().map((person) => {
          return (
            <div key={person.name}>
              <li>
              {person.name} {person.number}
              <button onClick={() => deleteButtonHandler(person.id)}>delete</button>
             </li>

              <br/>
            </div>
          );
        })
      )}
    </>
  );
};

export default Persons;

