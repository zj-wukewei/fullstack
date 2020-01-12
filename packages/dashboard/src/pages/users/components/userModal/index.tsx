import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { NewUserInput } from '@users/common/src/dto';
import { UseModalResult } from '../../../../hooks';

interface UserModalProps extends UseModalResult, FormComponentProps<NewUserInput> {
  loading: boolean;
  createUser: (userInput: NewUserInput) => void;
}

const UserModal: React.SFC<UserModalProps> = props => {
  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, createUser } = props;
    form.validateFields((err, values: NewUserInput) => {
      if (!err) {
        createUser(values);
      }
    });
  };

  return (
    <Modal
      title="添加用户"
      destroyOnClose
      visible={props.visible}
      onOk={() => handleOnOk()}
      okText="确定"
      confirmLoading={props.loading}
      cancelText="取消"
      onCancel={props.closeModal}
    >
      <Form layout="vertical">
        <Form.Item label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码!' }],
          })(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<UserModalProps>()(UserModal);
