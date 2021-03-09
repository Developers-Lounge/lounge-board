import users from 'fixtures/db/user'

describe("User Sign-up", () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it("should sign up well", function () {
    const emailAddress = 'email@example.com'
    const password = 'password'
    const hrefRegExp = /href="([^"]*)/

    // submit a form
    cy.get("input[name='username']").type('username')
    cy.get("input[name='firstName']").type('First Name')
    cy.get("input[name='lastName']").type('Last Name')
    cy.get("input[name='email']").type(emailAddress)
    cy.get("input[name='password']").type(password)
    cy.get("button[type='submit']").click()
    cy.contains('A message with a confirmation link has been sent to your email address.')

    // check email received
    cy.getLastEmail().should(email => {
      expect(email.to).to.eq(emailAddress)
      expect(email.subject).to.eq('Confirmation instructions')
      expect(email.html).to.match(hrefRegExp)
      cy.wrap(email.id).as('firstEmailId')
    });

    // check new email which should come after clicking on resend
    cy.contains('Resend confirmation instructions').as('resendButton').click()
    cy.getLastEmail().should(email => {
      expect(email.to).to.eq(emailAddress)
      expect(email.subject).to.eq('Confirmation instructions')
      expect(email.html).to.match(hrefRegExp)
      cy.get('@firstEmailId').should('not.to.eq', email.id)
      cy.wrap(email).as('resentEmail')
    });

    // resend button gets temporary disabled to avoid spamming
    cy.contains('Email was sent')
    cy.get('@resendButton').should('be.disabled')
    cy.clock().tick(5000)
    cy.get('@resendButton').not('.disabled')

    // try to sign in
    cy.contains('Back to Sign In').click()
    cy.location('pathname').should('eq', '/sign-in')
    cy.get("input[name='usernameOrEmail']").type(emailAddress)
    cy.get("input[name='password']").type(password)
    cy.get('button').contains('Sign In').click()
    cy.contains('You have to confirm your email address before continuing.')

    // confirm email
    cy.get('@resentEmail').then((email) => {
      const { html } = email as unknown as { html: string }
      const href = html.match(hrefRegExp)[1]
      cy.visit(href)
    })

    // should be logged in
    cy.location('pathname').should('eq', '/')
  });

  it.only('should check inputs', () => {
    cy.get("button[type='submit']").as('submit').click()

    ;['Username', 'First name', 'Last name', 'Email', 'Password'].forEach((label) => {
      cy.contains(`${label} is a required field`)
    })

    // fill all fields except username
    cy.get("input[name='firstName']").type('First name')
    cy.get("input[name='lastName']").type('Last name')
    cy.get("input[name='email']").type('email@mail.com')
    cy.get("input[name='password']").type('password')

    const [user] = users

    // check username taken error
    cy.get("input[name='username']").type(user.username)
    cy.contains('Username is already taken')

    // check email taken error
    cy.get("input[name='username']").clear().type('free-username')
    cy.get("input[name='email']").clear().type(user.email)
    cy.contains('Email is already taken')

    // check too short password
    cy.get("input[name='email']").clear().type('free-email@mail.com')
    cy.get("input[name='password']").clear().type('12345')
    cy.contains('Password must be at least 6 characters')
    cy.get("input[name='password']").clear().type('123456')

    // check too short username
    cy.get("input[name='username']").clear().type('12')
    cy.contains('Username must be at least 3 characters')
  })
})