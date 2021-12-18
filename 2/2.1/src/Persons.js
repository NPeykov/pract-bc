const Persons = ({ persons, filter }) => {
  let personsToRender = persons.filter((p) => p.name.includes(filter));

  return (
    <>
      <h2>Numbers</h2>
      {personsToRender.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.phone}
          </p>
        );
      })}
    </>
  );
};

export default Persons;

