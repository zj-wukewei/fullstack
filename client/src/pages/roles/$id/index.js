import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Spin, Form, Input, Row, Col, Checkbox, Button } from 'antd';
import { FormCard, authorize } from '../../../components';
import { message } from 'antd';
import { RolePagePermission } from '../../../configs/router';

import './index.less';

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

    permissions(pn: 0, ps: 99999) {
      totalSize
      list {
        id
        alias
        name
        group
        createDate
      }
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation updateRole($name: String!, $describe: String!, $permissionIds: [Int!], $id: Int!) {
    updateRole(
      updateRoleData: { name: $name, describe: $describe, permissionIds: $permissionIds }
      id: $id
    ) {
      id
      name
      describe
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
    fetchPolicy: 'network-only',
  });

  const [updateRole, { loading: updateRoleLoading }] = useMutation(UPDATE_ROLE, {
    onCompleted() {
      message.success('角色权限更新成功');
    },
    refetchQueries: () => [{ query: ROLE, variables: { id: Number(id) } }],
  });

  const permissionsGroup = _.groupBy(data && data.permissions && data.permissions.list, 'group');

  const role = (data && data.role) || {};

  const handleOnUpdate = () => {
    const { form } = props;
    form.validateFields(async (err, values) => {
      if (!err) {
        updateRole({
          variables: {
            name: values.name,
            describe: values.describe,
            permissionIds: values.permissionIds,
            id: Number(id),
          },
        });
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <Form layout="vertical">
        <FormCard title="基本信息">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="角色名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入角色名!' }],
                  initialValue: role.name,
                })(<Input placeholder="name" />)}
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item label="描述">
                {getFieldDecorator('describe', {
                  initialValue: role.describe,
                })(<Input placeholder="describe" />)}
              </Form.Item>
            </Col>
          </Row>
        </FormCard>

        <FormCard title="角色权限">
          {getFieldDecorator('permissionIds', {
            initialValue: _.map(role.permissions, item => Number(item.id)),
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              {_.map(permissionsGroup, (pg, key) => (
                <div key={key} className="permission-group">
                  <div className="permission-header">{key}</div>
                  <Row gutter={16} className="permissions">
                    {pg.map(item => (
                      <Col key={item.id} xs={24} md={12} lg={8}>
                        <Checkbox value={Number(item.id)}>
                          <strong>{item.name}</strong>
                          <span>&nbsp;&nbsp;{item.alias}</span>
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Checkbox.Group>,
          )}
        </FormCard>
        <Button loading={updateRoleLoading} onClick={handleOnUpdate} type="primary">
          更新
        </Button>
      </Form>
    </Spin>
  );
};

export default authorize(RolePagePermission)(Form.create()(RoleDetail));
