import {user} from 'fixtures/db/user'

describe('Reset password', () => {
  it('should reset password', () => {
    const hrefRegExp = /href="([^"]*)/

    cy.visit('/forgot-password')
    cy.get("input[name='email']").type(user.email)
    cy.get("button[type='submit']").click()
    cy.contains('Please check your email')

    cy.getLastEmail().should(email => {
      expect(email.to).to.eq(user.email)
      expect(email.subject).to.eq('Reset password instructions')
      expect(email.html).to.match(hrefRegExp)

      const { html } = email as unknown as { html: string }
      const href = html.match(hrefRegExp)[1]
      cy.visit(href)
    })

    cy.location('pathname').should('eq', '/reset-password')
    cy.get("input[name='password']").type('new_password')
    cy.get("button[type='submit']").click()

    cy.location('pathname').should('eq', '/')
    cy.contains('Log Out').click()

    cy.location('pathname').should('eq', '/sign-in')
    cy.get("input[name='usernameOrEmail']").type(user.username)
    cy.get("input[name='password']").type('new_password')
    cy.get("button[type='submit']").click()
    cy.location('pathname').should('eq', '/')
  })

  it('should give error for unregistered email', () => {
    cy.visit('/forgot-password')
    cy.get("input[name='email']").type('non-registered@mail.com')
    cy.get("button[type='submit']").click()
    cy.contains('The email you entered does not belong to an active account.')
  })

  it('should give error when trying to reset password with invalid token', () => {
    cy.visit('/reset-password')
    cy.contains('Reset password token is invalid')
  })
})