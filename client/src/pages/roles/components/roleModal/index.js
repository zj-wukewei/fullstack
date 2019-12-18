import { Modal, Form, Input } from 'antd';

const RoleModal = props => {
  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, addRole } = props;
    form.validateFields(async (err, values) => {
      if (!err) {
        addRole({ variables: { name: values.name, describe: values.describe } });
      }
    });
  };

  return (
    <Modal
      title="添加角色"
      destroyOnClose={true}
      visible={props.visible}
      onOk={handleOnOk}
      okText="确定"
      loading={props.loading}
      cancelText="取消"
      onCancel={props.closeModal}
    >
      <Form layout="vertical">
        <Form.Item label="角色名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入角色名!' }],
          })(<Input placeholder="name" />)}
        </Form.Item>

        <Form.Item label="描述">
          {getFieldDecorator('describe')(<Input placeholder="describe" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(RoleModal);
