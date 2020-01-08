import React from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ApolloError } from 'apollo-client';
import { LoginArgs } from '@users/common/src/dto';

import './index.less';

interface LoginFormProps extends FormComponentProps<LoginArgs> {
  login: (args: LoginArgs) => void;
  loading: boolean;
  error: ApolloError | undefined;
}

const LoginForm = (props: LoginFormProps) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    console.log('handleSubmit');
    props.form.validateFields(async (err, values: LoginArgs) => {
      if (!err) {
        props.login(values);
      }
    });
  };

  return (
    <div className="login-container">
      <h1>Nest.js-Graphql-Typeorpm-Apollo学习</h1>

      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码!' }],
          })(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入手机密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Button onClick={handleSubmit} loading={props.loading} type="primary" className="login-form-button">
          Log in
        </Button>

        {props.error && (
          <div className="error">
            {(props.error.graphQLErrors[0] &&
              props.error.graphQLErrors[0].message &&
              props.error.graphQLErrors[0].message) ||
              '未知错误'}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Form.create<LoginFormProps>()(LoginForm);
