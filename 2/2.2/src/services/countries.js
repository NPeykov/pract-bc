import axios from "axios";

const MAX_RESPONSE_SLICED = 15;

export function getCountries(filterText) {
  return filterText === ""
    ? Promise.resolve([])
    : axios
        .get(`https://restcountries.com/v2/name/${filterText}`)
        .then((response) => {
          return response.data.slice(0, MAX_RESPONSE_SLICED);
        });
}