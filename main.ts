import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schema.ts";
import { Client } from "./resolvers/Client.ts";
import { Driver } from "./resolvers/Driver.ts";
import { Journey } from "./resolvers/Journey.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Client,
    Driver,
    Journey,
  },
});

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);