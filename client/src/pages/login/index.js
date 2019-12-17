import React from 'react';
import gql from 'graphql-tag';
import router from 'umi/router';
import { useMutation } from "@apollo/react-hooks";

import LoginForm from './components/loginForm';
import { loginIn } from '../../utils/apollo';

const LOGIN_APP = gql`
   mutation login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      accessToken
     }
    }
`;

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_APP, {
    onCompleted({ login }) {
      loginIn(login.accessToken);
      router.push('/');
    },
    onError(error) {
      console.error(error);
    }
  });

  return  (
    <LoginForm loading={loading} error={error} login={login} />
  );
};

export default Login;
