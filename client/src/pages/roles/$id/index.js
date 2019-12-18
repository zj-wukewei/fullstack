import { Spin, Form, Input, Row, Col } from 'antd';
import { authorize } from '../../../components/authorize';
import FormCard from '../../../components/formCard';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RolePagePermission } from '../../../configs/router';

const ROLE = gql`
  query Role($id: Int!) {
    role(id: $id) {
      id
      name
      describe
      permissions {
        id
        alias
        name
        createDate
      }
      createDate
    }
  }
`;

const RoleDetail = props => {
  const {
    params: { id },
  } = props.match;
  
  const { getFieldDecorator } = props.form;

  const { data, loading } = useQuery(ROLE, {
    variables: { id: Number(id) },
  });

  return (
    <Spin spinning={loading}>
      <Form layout="vertical">
        <FormCard title="基本信息">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="角色名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入角色名!' }],
                })(<Input placeholder="name" />)}
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item label="描述">
                {getFieldDecorator('describe')(<Input placeholder="describe" />)}
              </Form.Item>
            </Col>
          </Row>
        </FormCard>

        <FormCard title="角色权限"></FormCard>
      </Form>
    </Spin>
  );
};

export default authorize(RolePagePermission)(Form.create()(RoleDetail));
