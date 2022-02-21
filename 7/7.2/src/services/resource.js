import axios from 'axios'

export async function getAll(url) {
	const { data } = await axios.get(url)
	return data
}

export async function createResource(url, newNote) {
	const { data } = await axios.post(url, newNote)
	return data
}
