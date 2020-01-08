import React from 'react';
import gql from 'graphql-tag';
import router from 'umi/router';
import { useMutation } from '@apollo/react-hooks';
import { Auth } from '@users/common/src/models';
import { LoginArgs } from '@users/common/src/dto';

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
  const [submitLoginMutation, { loading, error }] = useMutation<
    {
      login: Auth;
    },
    LoginArgs
  >(LOGIN_APP, {
    onCompleted({ login }) {
      loginIn(login.accessToken);
      router.push('/');
    },
  });

  const handleOnSubmit = (args: LoginArgs) => {
    submitLoginMutation({ variables: args });
  };

  return <LoginForm error={error} loading={loading} login={handleOnSubmit} />;
};

export default Login;
