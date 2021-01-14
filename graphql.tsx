import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const cache = new InMemoryCache();
const link = new HttpLink({
  // uri: 'https://expense-tracker-graphql.herokuapp.com/graphql',
  uri: 'http://192.168.0.157:3030/graphql',
  fetch:fetch
});

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: defaultOptions
});


export default client;
