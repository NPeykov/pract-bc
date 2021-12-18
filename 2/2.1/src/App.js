import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => 
        setPersons(response.data));
  }, []);

  return (
    <div>
      <Filter setter={setFilterText} />
      <PersonForm persons={persons} setter={setPersons} />
      <Persons persons={persons} filter={filterText} />
    </div>
  );
};

export default App;
