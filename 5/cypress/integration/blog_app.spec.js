describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/db/reset')
		const user = { name: 'nico', user_name: 'bojji', password: 'king' }
		cy.request('POST', 'http://localhost:3002/api/user', user)
    cy.visit('http://localhost:3000')
  })

  it('blogs text is shown', function() {
		cy.contains('blogs')
  })

	it('user can login with right credentials', function() {
		cy.login({ user_name: 'bojji', password: 'king' })
		cy.get('input[placeholder=username]').type('bojji')
		cy.get('input[placeholder=password]').type('king')
		cy.get('button').click()

		cy.contains('Hi bojji')
	})

	it.only('user can add a blog', function() {
		cy.login({ user_name: 'bojji', password: 'king' })
		cy.get('input[placeholder=username]').type('bojji')
		cy.get('input[placeholder=password]').type('king')
		cy.get('button').click()

		cy.addBlog()
		
		cy.contains('Desert')
	})

})
