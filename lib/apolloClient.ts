import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
    fetch, // Use the global fetch function
  }),
  cache: new InMemoryCache(),
});

export default client;
