import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

let blog

beforeEach(() => {
	blog = {
		title: 'The super test',
		author: 'John',
		likes: 5,
		url: 'localhost.com'
	}
})

test('blog shows title but does not show url', () => {
	const component = render(
		<Blog blog={blog} />
	)

	expect(component.container).toHaveTextContent(blog.title)
	expect(component.container).not.toHaveTextContent(blog.url)
})

test('likes and url are shown when info button is clicked', () => {
	const component = render(<Blog blog={blog} />)
	const infoButton = component.getByText('show info')

	expect(component.container).not.toHaveTextContent(blog.url)

	fireEvent.click(infoButton)

	expect(component.container).toHaveTextContent(blog.url)
	expect(component.container).toHaveTextContent(blog.likes)
})

