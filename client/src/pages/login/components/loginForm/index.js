import React from 'react';
import { Button, Form, Icon, Input } from 'antd';

import './index.less';

const LoginForm = props => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        props.login({ variables: { phone: values.phone, password: values.password } });
      }
    });
  };
  

  return (
    <div className="login-container">

      <h1>Nest.js-Graphql-Typeorpm-Apollo学习</h1>

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码!' }, {
              message:'手机号码格式不正确！',
              pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
          }],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Phone"
            />,
          )}
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
        <Button
          loading={props.loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>

        {
          props.error && (
          <div className="error">{props.error.graphQLErrors[0] && 
            props.error.graphQLErrors[0].message && props.error.graphQLErrors[0].message.error || "发生了一个错误"}</div>
          )
        }


      </Form>
    </div>
  );
};

export default Form.create()(LoginForm);
