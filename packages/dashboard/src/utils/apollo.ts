import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { Auth } from '@users/common/src/models';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import router from 'umi/router';
import gql from 'graphql-tag';
import { message as antdMessage } from 'antd';

const cache = new InMemoryCache();

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'uId';

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const loginOut = () => {
  cache.reset().then(() => {
    localStorage.setItem(TOKEN_KEY, '');
    cache.writeData({ data: { isLoggedIn: false } });
    router.push('/login');
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      console.error(`❌ [GraphQL error]: ${JSON.stringify(error)}`);
      if (error.message === '身份信息已过期，请重新登录') {
        antdMessage.warn('身份信息已过期，请重新登录', () => loginOut());
      } else {
        antdMessage.error(error.message);
      }
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(link),
  cache,
  resolvers: {},
  typeDefs,
});

const loginIn = (user: Auth) => {
  localStorage.setItem(TOKEN_KEY, user.accessToken);
  localStorage.setItem(USER_ID_KEY, String(user.uId));
  client.writeData({ data: { isLoggedIn: true } });
};

export { client, loginIn, loginOut };
