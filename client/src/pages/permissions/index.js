import { Authorize, authorize } from '../../components';
import { PermissionPagePermission } from '../../configs/router';
import { useModal, useTable } from '../../hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { dataFormat } from '../../utils';
import { Table, Button } from 'antd';

const ROLES_PAGE = gql`
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

const Permission = () => {
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

  const permissions = (data && data.permissions) || { totalSize: 0, list: [] };

  return (
    <div>
      <Authorize match={'PERMISSION_CREATE'}>
        <Button type="primary" onClick={() => null}>
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
    </div>
  );
};

export default authorize(PermissionPagePermission)(Permission);
