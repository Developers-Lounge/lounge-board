const getEmails = ({ limit, one }: { limit?: number, one?: boolean }) =>
  cy
    .request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/tests/emails`,
      qs: {
        limit,
      },
    })
    .then(({ body }) => {
      if (body) return one ? body[0] : body;

      cy.wait(100);

      return getEmails({ limit, one });
    })


Cypress.Commands.add('getLastEmail', () => {
  getEmails({ limit: 1, one: true })
});

Cypress.Commands.add('getEmails', ({ limit }: { limit?: number } = {}) =>
  getEmails({ limit })
);
