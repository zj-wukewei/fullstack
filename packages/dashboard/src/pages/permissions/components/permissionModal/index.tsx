import React from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { NewPermissionInput } from '@users/common/src/dto';
import { UseModalResult } from '../../../../hooks';

interface PermissionModalProps extends UseModalResult, FormComponentProps<NewPermissionInput> {
  loading: boolean;
  createPermission: (permissionInput: NewPermissionInput) => void;
}

const PermissionModal: React.SFC<PermissionModalProps> = props => {
  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, createPermission } = props;
    form.validateFields(async (err, values: NewPermissionInput) => {
      if (!err) {
        createPermission(values);
      }
    });
  };

  return (
    <Modal
      title="添加权限"
      destroyOnClose
      visible={props.visible}
      onOk={() => handleOnOk()}
      okText="确定"
      confirmLoading={props.loading}
      cancelText="取消"
      onCancel={props.closeModal}
    >
      <Form layout="vertical">
        <Form.Item label="权限名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入角色名!' }],
          })(<Input placeholder="name" />)}
        </Form.Item>

        <Form.Item label="别名">{getFieldDecorator('alias')(<Input placeholder="alias" />)}</Form.Item>

        <Form.Item label="属于组">
          {getFieldDecorator('group', {
            rules: [{ required: true, message: '请输入组!' }],
          })(<Input placeholder="group" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<PermissionModalProps>()(PermissionModal);
