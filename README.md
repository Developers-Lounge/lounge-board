# A project to play with tools and learn

Includes react app in the client/ and nest.js in server/

Copy .env.example to .env three times: on top level, in client and in server

## Tests

Powered with cypress e2e testing, code coverage is set up.

To run tests:
```
cd client && npm start # start frontend

# see README in server/ to set it up, and then:
cd server && npm run start:test

# open cypress in window:
npm run cypress open

# run cypress tests without window:
npm run cypress run
```
