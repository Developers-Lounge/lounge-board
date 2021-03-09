import {user, unconfirmed} from 'fixtures/db/user'

describe('Login', () => {
  it('should login by username', () => {
    cy.visit('/sign-in')
    cy.get("input[name='usernameOrEmail']").type(user.username)
    cy.get("input[name='password']").type(user.password)
    cy.get("button[type='submit']").click()
    cy.location('pathname').should('eq', '/')
  })

  it('should login by email', () => {
    cy.visit('/sign-in')
    cy.get("input[name='usernameOrEmail']").type(user.email)
    cy.get("input[name='password']").type(user.password)
    cy.get("button[type='submit']").click()
    cy.location('pathname').should('eq', '/')
  })

  it('should restrict unconfirmed', () => {
    cy.visit('/sign-in')
    cy.get("input[name='usernameOrEmail']").type(unconfirmed.email)
    cy.get("input[name='password']").type(unconfirmed.password)
    cy.get("button[type='submit']").click()
    cy.contains('You have to confirm your email address before continuing.')
  })

  it('should validate username/email and password', () => {
    cy.visit('/sign-in')
    cy.get("button[type='submit']").click()
    cy.contains('Username or email is a required field')
    cy.contains('Password is a required field')

    cy.get("input[name='usernameOrEmail']").type('u')
    cy.get("button[type='submit']").click()
    cy.contains('Username or email must be at least 3 characters')

    cy.get("input[name='password']").type('p')
    cy.get("button[type='submit']").click()
    cy.contains('Password must be at least 6 characters')

    cy.get("input[name='usernameOrEmail']").clear().type('unregistered@mail.com')
    cy.get("input[name='password']").clear().type(user.password)
    cy.get("button[type='submit']").click()
    cy.contains('Email or password is incorrect')

    cy.get("input[name='usernameOrEmail']").clear().type(user.email)
    cy.get("input[name='password']").clear().type('123456')
    cy.get("button[type='submit']").click()
    cy.contains('Email or password is incorrect')

    cy.get("input[name='usernameOrEmail']").clear().type(user.username)
    cy.get("input[name='password']").clear().type('123456')
    cy.get("button[type='submit']").click()
    cy.contains('Email or password is incorrect')
  })
})
