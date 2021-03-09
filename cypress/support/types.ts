/// <reference types="cypress" />

type Email = {
  id: number
  to: string
  subject: string
  html: string
}

declare namespace Cypress {
  interface Chainable {
    getLastEmail(): Chainable<Email>
    getEmails(params?: { limit?: number }): Chainable<Email[]>
  }
}