import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import router from 'umi/router';
import gql from 'graphql-tag';
import { message as antdMessage } from 'antd';

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
})

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const { message = "未知错误", statusCode } = graphQLErrors[0].message || {};
    if (statusCode === 401) {
      antdMessage.info(message, 3, () => router.push('/login'));
    } else {
      antdMessage.error(message);
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`; 

const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache,
    resolvers: {},
    typeDefs: typeDefs
});

const loginOut = () => {
  localStorage.setItem('token', "");
  cache.writeData({ data: { isLoggedIn: false }});
  router.push('/login')
}

const loginIn = (token) => {
    localStorage.setItem('token', token);
    client.writeData({ data: { isLoggedIn: true } });
}



export { client, loginIn, loginOut };