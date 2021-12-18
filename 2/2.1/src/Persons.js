const Persons = ({ persons, filter }) => {
  let personsToRender = persons.filter((p) => p.name.includes(filter));

  return (
    <>
      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>"CARGANDO..."</p>
      ) : (
        personsToRender.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })
      )}
    </>
  );
};

export default Persons;

