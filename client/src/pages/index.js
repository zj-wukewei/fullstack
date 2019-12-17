import React from 'react';
import Redirect from 'umi/redirect';
import { useQuery  } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function BasicAppLayout(props) {
  const { data } = useQuery(IS_LOGGED_IN);
  const redirect = data.isLoggedIn ? '/home' : '/login';
  return (
    <Redirect to={redirect} {...props} />
  );
}

export default BasicAppLayout;
