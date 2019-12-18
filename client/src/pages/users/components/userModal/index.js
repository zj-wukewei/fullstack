import { Modal, Form, Input, Icon } from 'antd';

const UserModal = props => {

  const { getFieldDecorator } = props.form;
  const handleOnOk = () => {
    const { form, addUser } = props;
     form.validateFields(async (err, values) => {
      if (!err) {
        addUser({ variables: { phone: values.phone } });
      }
    });
  }

  return (
    <Modal
      title='添加用户'
      destroyOnClose={true}
      visible={props.visible}
      onOk={handleOnOk}
      okText='确定'
      loading={props.loading}
      cancelText='取消'
      onCancel={props.closeModal}>
          <Form layout="vertical">
             <Form.Item label="手机号码">
               {getFieldDecorator('phone', {
                 rules: [{ required: true, message: '请输入手机号码!' }],
               })(
                 <Input
                   prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   placeholder="Phone"
                 />
               )}
        </Form.Item>
          </Form>
    </Modal>
  );
};

export default Form.create()(UserModal);
