import Authorize, { authorize } from '../../components/authorize';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RolePagePermission } from '../../configs/router';
import gql from 'graphql-tag';
import { Table, Button } from 'antd';
import { dataFormat } from '../../utils';
import { useModal, useTable } from '../../hooks';
import RoleModal from './components/roleModal';
import router from 'umi/router';

const ROLES_PAGE = gql`
  query RolesPage($ps: Int!, $pn: Int!) {
    roles(ps: $ps, pn: $pn) {
      totalSize
      list {
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
  }
`;

const ADD_ROLE = gql`
  mutation createRole($name: String!, $describe: String) {
    createRole(newRoleData: { name: $name, describe: $describe }) {
      id
      name
      describe
      createDate
    }
  }
`;

const Roles = () => {
  const { ps, pn, handleOnChange, pagination } = useTable();

  const { data, loading } = useQuery(ROLES_PAGE, {
    variables: { ps, pn },
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: text => dataFormat(text),
    },
  ];

  const roles = (data && data.roles) || { totalSize: 0, list: [] };

  const roleModel = useModal();

  const [createRole, { loading: addLoading }] = useMutation(ADD_ROLE, {
    onCompleted() {
      roleModel.closeModal();
    },
    refetchQueries: () => [{ query: ROLES_PAGE, variables: { pn, ps } }],
  });

  return (
    <div>
      <Authorize match={'ROLE_CREATE'}>
        <Button type="primary" onClick={() => roleModel.openModal()}>
          添加
        </Button>
      </Authorize>
      <Table
        rowKey="id"
        style={{ marginTop: '10px' }}
        size="small"
        dataSource={roles.list}
        columns={columns}
        loading={loading}
        onChange={handleOnChange}
        onRowClick={record => {
          router.push(`roles/${record.id}`);
        }}
        pagination={{
          total: roles.totalSize,
          ...pagination,
        }}
      />

      <RoleModal loading={addLoading} {...roleModel} createRole={createRole} />
    </div>
  );
};

export default authorize(RolePagePermission)(Roles);
