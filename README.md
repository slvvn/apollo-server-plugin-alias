# Apollo Server Plugin Alias
Plugin for Apollo Server to create aliased queries and mutations in order to minimize script and request sizes.

## Motivation
Apollo Server does have a feature called [Automatic Persisted Queries](https://www.apollographql.com/docs/apollo-server/performance/apq/), which allows you to reduce request sizes. However it does not allow you to create a persisted query yourself, but instead works in an automatic way. This is great for certain use cases, but it does not allow us to reduce the size of the query definition and request payload manually. This plugin allows you to create a query alias which can be transformed server side to the desired syntax of the query.

## Installation
```bash
npm i apollo-server-plugin-alias
```

Or

```bash
yarn add apollo-server-plugin-alias
```

## Usage

Create an alias:

```ts
import { Alias } from "apollo-server-plugin-alias";

const exampleAlias: Alias<{ inputVar: string }, { outputVar: number }> = {
  replacement: `
    mutation ExampleMutation($input: ExampleInput!) {
      create(input: $input) {
        success
      }
    }
  `,
  transformVariables: (variables) => ({
    outputVar: +variables.inputVar,
  }),
}

const aliases = {
  "exampleAlias": exampleAlias,
}
```

Initialize the plugin into the Apollo Server instance:

```ts
import { ApolloServerPluginAlias } from "apollo-server-plugin-alias";

const server = new ApolloServer({
  /* ... */,
  plugins: [
    /* ... */,
    ApolloServerPluginAlias(aliases),
  ],
});
```

Then leverage the alias by sending a query or mutation request from the client:

```ts
{
  "extensions": { "alias": "exampleAlias" },
  "variables": {
    "inputVar": "100",
  }
}
```
