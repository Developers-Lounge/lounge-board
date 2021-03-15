# Getting Started

npm start to start dev, npm run build to build, npm run test - no tests yet

Structured by "domains", little bit messy for now.

Uses tailwind for styling, I suggest to install webstorm or vscode plugin for it to suggest classes.

yup for validation, react-hook-form for forms, custom wrapper to make a friendship between them.

## Making queries

Write a graphql query somewhere in the project in the file with .graphql suffix.

Run `npm run generate` on the top level, this will generate graphql typed hooks into `src/generated/graphql.ts`

And now you can use the query with generated hook, example:

```ts
const [sayHello, { loading, error }] = useHelloMutation({
  errorPolicy: 'all',
  onCompleted(data) {
    if (data) console.log(data)
  },
})
```
