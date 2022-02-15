Cypress.Commands.add('login', ({ user_name, password }) => {
  cy.request('POST', 'http://localhost:3002/api/login', {
    user_name, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlog', () => {
	const blog = {
		title: 'Biggest king',
		author: 'Desert',
		likes: 5,
		url: 'locak'
	}
 cy.request({
    url: 'http://localhost:3002/api/blog',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
