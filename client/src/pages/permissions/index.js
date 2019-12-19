import { Authorize, authorize } from '../../components';
import { PermissionPagePermission } from '../../configs/router';
import { useModal, useTable } from '../../hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { dataFormat } from '../../utils';
import { Table, Button } from 'antd';
import PermissionModal from './components/permissionModal';

const PERMISSION_PAGE = gql`
  query PermissionsPage($ps: Int!, $pn: Int!) {
    permissions(ps: $ps, pn: $pn) {
      totalSize
      list {
        id
        name
        alias
        group
        createDate
      }
    }
  }
`;

const ADD_PERMISSION = gql`
  mutation createPermission($name: String!, $alias: String, $group: String!) {
    createPermission(newPermissionData: { name: $name, alias: $alias, group: $group }) {
      id
      name
      alias
      group
      createDate
    }
  }
`;

const Permission = () => {
  const { ps, pn, handleOnChange, pagination } = useTable();

  const { data, loading } = useQuery(PERMISSION_PAGE, {
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
      title: '别名',
      dataIndex: 'alias',
      key: 'alias',
    },
    {
      title: '属于组',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: text => dataFormat(text),
    },
  ];

  const [createPermission, { loading: addLoading }] = useMutation(ADD_PERMISSION, {
    onCompleted() {
      permissionModel.closeModal();
    },
    refetchQueries: () => [{ query: PERMISSION_PAGE, variables: { pn, ps } }],
  });

  const permissions = (data && data.permissions) || { totalSize: 0, list: [] };

  const permissionModel = useModal();
  return (
    <div>
      <Authorize match={'PERMISSION_CREATE'}>
        <Button type="primary" onClick={() => permissionModel.openModal()}>
          添加
        </Button>
      </Authorize>
      <Table
        rowKey="id"
        style={{ marginTop: '10px' }}
        size="small"
        dataSource={permissions.list}
        columns={columns}
        loading={loading}
        onChange={handleOnChange}
        pagination={{
          total: permissions.totalSize,
          ...pagination,
        }}
      />

      <PermissionModal
        loading={addLoading}
        {...permissionModel}
        createPermission={createPermission}
      />
    </div>
  );
};

export default authorize(PermissionPagePermission)(Permission);
