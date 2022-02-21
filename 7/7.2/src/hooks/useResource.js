import { useState, useEffect } from 'react'
import { getAll, createResource } from '../services/resource.js'

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	useEffect(() => {
		getAll(baseUrl).then(data => setResources(data))	
	}, [])

	const create = async (resource) => {
		const data = await createResource(baseUrl, resource)
		setResources([...resources, data])
	}

	const service = {
		create
	}

	return [
		resources, service
	]
}

export default useResource
