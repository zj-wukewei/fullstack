import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/es/form';
import { UpdateUserInfo } from '@users/common/src/dto';
import { AuthUser } from '@users/common/src/models';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IPageProps } from '../../../interfaces';

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

const EXCHANGE_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      phone
      info {
        id
        name
        address
        age
      }
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($name: String!, $address: String!, $age: Int!, $id: Int!) {
    updateUserInfo(updateUserInfo: { name: $name, address: $address, age: $age }, id: $id) {
      info {
        id
        name
        address
        age
      }
    }
  }
`;

interface UserInfoProps extends IPageProps<{ id: string }>, FormComponentProps<UpdateUserInfo> {}

const UserInfoPage: React.SFC<UserInfoProps> = props => {
  const {
    params: { id },
  } = props.match;

  const { getFieldDecorator } = props.form;
  const { data } = useQuery<{
    user: AuthUser;
  }>(EXCHANGE_USER, {
    variables: { id: Number(id) },
    fetchPolicy: 'network-only',
  });

  const info = data && data.user && data.user.info;

  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO, {
    onCompleted() {
      message.success('更新成功');
      router.push('/users');
    },
    refetchQueries: () => [{ query: EXCHANGE_USER, variables: { id: Number(id) } }],
  });

  const handleSubmit = (e: any) => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        updateUserInfo({
          variables: { name: values.name, address: values.address, age: values.age, id: Number(id) },
        });
      }
    });
  };

  return (
    <>
      <span>个人信息更新:</span>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Form layout="horizontal">
          <Form.Item label="姓名" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名!' }],
              initialValue: info?.name,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入地址!' }],
              initialValue: info?.address,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="年龄" {...formItemLayout}>
            {getFieldDecorator('age', {
              rules: [{ required: true, message: '请输入年龄!' }],
              initialValue: info?.age,
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={handleSubmit} loading={loading} type="primary">
              更新
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Form.create<UserInfoProps>()(UserInfoPage);
