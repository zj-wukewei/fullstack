import React from 'react';

import { ApolloProvider  } from '@apollo/react-hooks';
import { client } from './utils/apollo';

function AppLayout(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default AppLayout;
