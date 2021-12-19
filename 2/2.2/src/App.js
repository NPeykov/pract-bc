import React, {useState } from "react";
import Countries from "./Countries";

const INITIAL_FILTER_TEXT = '';

const App = () => {
  const [filterText, setFilterText] = useState(INITIAL_FILTER_TEXT);

  function filterInputHandler(event) {
    let text = event.currentTarget.value;
    setFilterText(text)
  }

  return (
    <div>
      <h2>Find countries</h2>
      <input onChange={filterInputHandler}/>
      <Countries filterText={filterText}/>
    </div>
  );
};

export default App;
