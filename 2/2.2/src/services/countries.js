import axios from "axios";

const MAX_SLICED_RESPONSE = 15;

export function getCountries(filterText) {
  return filterText === ""
    ? Promise.resolve([])
    : axios
        .get(`https://restcountries.com/v2/name/${filterText}`)
        .then((response) => {
          return response.data.slice(0, MAX_SLICED_RESPONSE);
        });
}
