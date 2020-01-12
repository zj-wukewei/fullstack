import React from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { NewRoleInput } from '@users/common/src/dto';
import { UseModalResult } from '../../../../hooks';

interface RoleModalProps extends UseModalResult, FormComponentProps<NewRoleInput> {
  loading: boolean;
  createRole: (roleInput: NewRoleInput) => void;
}

const RoleModal: React.SFC<RoleModalProps> = props => {
  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, createRole } = props;
    form.validateFields(async (err, values: NewRoleInput) => {
      if (!err) {
        createRole(values);
      }
    });
  };

  return (
    <Modal
      title="添加角色"
      destroyOnClose
      visible={props.visible}
      onOk={() => handleOnOk()}
      okText="确定"
      confirmLoading={props.loading}
      cancelText="取消"
      onCancel={props.closeModal}
    >
      <Form layout="vertical">
        <Form.Item label="角色名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入角色名!' }],
          })(<Input placeholder="name" />)}
        </Form.Item>

        <Form.Item label="描述">{getFieldDecorator('describe')(<Input placeholder="describe" />)}</Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<RoleModalProps>()(RoleModal);
