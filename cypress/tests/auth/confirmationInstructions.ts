import { user, unconfirmed } from "fixtures/db/user";

describe("Resend confirmation instructions", () => {
  beforeEach(() => {
    cy.visit('/resend-confirmation-instructions')
  })

  it('should show error if address was already confirmed', () => {
    cy.get("input[name='email']").type(user.email)
    cy.contains('Resend confirmation instructions').click()
    cy.contains('Email was already confirmed, please try signing in')
  })

  it('should send confirmation email with link', () => {
    cy.get("input[name='email']").type(unconfirmed.email)
    cy.contains('Resend confirmation instructions').as('resendButton').click()

    const hrefRegExp = /href="([^"]*)/

    // check email received
    cy.getLastEmail().should(email => {
      expect(email.to).to.eq(unconfirmed.email)
      expect(email.subject).to.eq('Confirmation instructions')
      expect(email.html).to.match(hrefRegExp)
      cy.wrap(email).as('email')
    });

    // resend button gets temporary disabled to avoid spamming
    cy.contains('Email was sent')
    cy.get('@resendButton').should('be.disabled')
    cy.clock().tick(5000)
    cy.get('@resendButton').not('.disabled')

    // confirm email
    cy.get('@email').then((email) => {
      const { html } = email as unknown as { html: string }
      const href = html.match(hrefRegExp)[1]
      cy.visit(href)
    })

    // should be logged in
    cy.location('pathname').should('eq', '/')
  })
});