import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import router from 'umi/router';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message instanceof Array) {

      } else {
        const { statusCode } = message;
        if (statusCode === 401) {
          router.push('/login');
        }
        return;
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache
});

const setToken = (token) => {
    localStorage.setItem('token', token);
}

export { client, setToken };