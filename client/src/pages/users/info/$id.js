import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
};

const EXCHANGE_WHOAMI = gql`
  query WhoAmI @client {
    whoAmI {
      id
      phone
      info {
        id
        name
        address
        age
      }
      roles
      permission
    }
  }
`;

const UserInfo = props => {
  const {
    params: { id },
  } = props.match;

  const { getFieldDecorator } = props.form;
  const { data } = useQuery(EXCHANGE_WHOAMI);

  const info = data && data.whoAmI && data.whoAmI.info || {}

  return (
    <>
      <span>个人信息更新:</span>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Form layout="horizontal">
          <Form.Item label="姓名" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名!' }],
              initialValue: info.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入地址!' }],
              initialValue: info.address
            })(<Input />)}
          </Form.Item>
          <Form.Item label="年龄" {...formItemLayout}>
            {getFieldDecorator('age', {
              rules: [{ required: true, message: '请输入年龄!' }],
              initialValue: info.age
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Form.create()(UserInfo);
