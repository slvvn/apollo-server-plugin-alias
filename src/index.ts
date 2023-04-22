import { ApolloServerPlugin } from "@apollo/server";

import { Aliases } from "./types";

const ApolloServerPluginAlias = (
  aliases: Aliases
): ApolloServerPlugin => ({
  requestDidStart: async ({ request }) => {
    const { extensions } = request;

    if (extensions?.alias) {
      const alias = aliases[extensions.alias];

      if (alias) {
        request.query = alias.replacement;

        if (alias.transformVariables) {
          request.variables = alias.transformVariables(request.variables);
        }
      }
    }
  },
});

export default ApolloServerPluginAlias;
