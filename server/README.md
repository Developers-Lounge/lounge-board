# Nestjs backend server

To start:

To create database:
```
npm run db create
```

To run migrations:
```
npm run db migrate
```

Start in dev mode:
```
npm run start
```

Before starting for tests run seeds command which will populate test database:
```
npm run seeds
```

Start for cypress tests:
```
npm run start:test
```

Graphql: schema-first approach taken as it seem to be less verbose then code-first.

## Test controller

Worth to mention a special directory `src/tests` - it has a controller and a monkey-patching script to allow transactional testing.

Before each test transaction begins, after each test it makes rollback, so one test won't affect on the other.

Also test controller provides endpoint to get sent emails to check them in tests.
