import '@cypress/code-coverage/support'
import './commands'

beforeEach(async () => {
  await fetch(`${Cypress.env('API_URL')}/tests/startTransaction`)
})

afterEach(async () => {
  await fetch(`${Cypress.env('API_URL')}/tests/rollbackTransaction`)
})
