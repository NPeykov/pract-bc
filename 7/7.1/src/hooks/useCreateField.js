import { useState } from 'react'

const useCreateField = (name = ':)') => {
	const [value, setValue] = useState('')

	const onChange = (e) => setValue(e.target.value)

	const reset = () => setValue('')

	return {
		fields: {
			name,
			value,
			onChange
		},
		reset
	}
}

export default useCreateField
