import { useState, useEffect } from "react";
import { getCountries } from "./services/countries.js";

const INITIAL_COUNTRY_STATE = [];

const Countries = ({ filterText }) => {
  const [countries, setCountries] = useState(INITIAL_COUNTRY_STATE);

  useEffect(() => {
    getCountries(filterText).then((data) => setCountries(data));
  }, [filterText]);

  function renderAllCountries() {
    return countries.map((country) => (
      <div key={country.name} style={{display: "flex"}}>
        <p>{country.name}</p>
        <button value={country.name} onClick={() => setCountries([country])}>show</button>
      </div>
    ));
  }

  function renderCountry() {
    const country = countries[0];
    console.log({country})
    return (
      <>
        <h2>{country.name}</h2>

        <img src={country.flag} alt="Flag" width="500" height="300"></img>

        <h3>Capital: {country.capital}</h3>

        <div>
          <h3>Borders with:</h3>
          <ul>
            {country.borders.map((border) => {
              return <li key={border}>{border}</li>;
            })}
          </ul>
        </div>

        <h3>
          There are {country.population} {country.demonym}s
        </h3>

        <h3>Region: {country.region}</h3>

        <h3>Subregion: {country.subregion}</h3>
      </>
    );
  }

  function renderCountries() {
    return countries.length === 1 ? renderCountry() : renderAllCountries();
  }

  return (
    <div>
      {countries.length === 0 ? "No countries to render" : renderCountries()}
    </div>
  );
};

export default Countries;
