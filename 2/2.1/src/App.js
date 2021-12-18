import React, { useState } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";

const INITIAL_PERSONS = [
  { name: "Arto Hellas", phone: "011-451242" },
  { name: "Tom Hendrix", phone: "011-425748" },
];

const App = () => {
 const [persons, setPersons] = useState(INITIAL_PERSONS);
 const [filterText, setFilterText] = useState("");

  return (
    <div>
      <Filter setter={setFilterText}/>
      <PersonForm persons={persons} setter={setPersons}/>
      <Persons persons={persons} filter={filterText} />
    </div>
  );
};

export default App;
