import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export function getPersons() {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
}

export function addPerson(person) {
  return axios
    .post(baseUrl, person)
    .then((response) => {
      return response.data;
    });
}

export function deletePerson(id) {
  return axios
    .delete(`${baseUrl}/${id}`)
}

export function updatePerson(id, person) {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then(response => {
      return response.data
    })
}