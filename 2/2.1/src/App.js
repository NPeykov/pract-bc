import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import {getPersons} from './services/personsAPI'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getPersons().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <Filter setter={setFilterText} />
      <PersonForm persons={persons} setPersons={setPersons}/>
      <Persons persons={persons} filterText={filterText} setPersons={setPersons}/>
    </div>
  );
};

export default App;
