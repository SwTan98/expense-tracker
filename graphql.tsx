import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


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
  uri: 'http://192.168.0.157:3030/graphql',
  fetch:fetch
});

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: defaultOptions
});


export default client;
