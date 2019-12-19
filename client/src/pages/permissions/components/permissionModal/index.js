import { Modal, Form, Input } from 'antd';

const PermissionModal = props => {
  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, createPermission } = props;
    form.validateFields(async (err, values) => {
      if (!err) {
        createPermission({
          variables: { name: values.name, alias: values.alias, group: values.group },
        });
      }
    });
  };

  return (
    <Modal
      title="添加权限"
      destroyOnClose={true}
      visible={props.visible}
      onOk={handleOnOk}
      okText="确定"
      loading={props.loading}
      cancelText="取消"
      onCancel={props.closeModal}
    >
      <Form layout="vertical">
        <Form.Item label="权限名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入角色名!' }],
          })(<Input placeholder="name" />)}
        </Form.Item>

        <Form.Item label="别名">
          {getFieldDecorator('alias')(<Input placeholder="alias" />)}
        </Form.Item>

        <Form.Item label="属于组">
          {getFieldDecorator('group', {
            rules: [{ required: true, message: '请输入组!' }],
          })(<Input placeholder="group" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(PermissionModal);
