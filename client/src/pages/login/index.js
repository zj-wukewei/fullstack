import { Button, message, Form, Icon, Input } from 'antd';
import { gql } from 'apollo-boost';
import router from 'umi/router';
import { client, setToken } from '../../utils/apollo';

import './index.less';

const LOGIN_APP = gql`
  {
    login(phone: "182580055781", password: "123456") {
      accessToken
    }
  }
`;

const Login = props => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const {
            data: { login },
          } = await client.query({ query: LOGIN_APP });
          login && login.accessToken && setToken(login.accessToken);
          router.push('/users');
        } catch (error) {
          message.error('登录失败!!');
          console.error(error);
        }
      }
    });
  };
  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone!' }],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Phone"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Form.create()(Login);
