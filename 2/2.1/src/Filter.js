
const Filter = ({setter}) => {

  function filterPerson(event) {
    let filterText = event.currentTarget.value;
    setter(filterText);
  }

  return (
    <>
      <h2>Phonebook</h2>
      <input onChange={filterPerson} />
    </>
  );
};

export default Filter;
