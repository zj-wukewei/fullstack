import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './utils/apollo';

interface IApp {
  children?: ((props: any) => React.ReactNode) | React.ReactNode;
}

const App = (props: IApp): JSX.Element => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default App;
