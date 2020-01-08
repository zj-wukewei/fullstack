import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Table, Button, message } from 'antd';
import { PermissionsPagination, Permission } from '@users/common/src/models';
import { BasePageArgs, NewPermissionInput } from '@users/common/src/dto';
import { Authorize, authorize, TableColumsDelete } from '../../components';
import { PermissionPagePermission } from '../../configs/router';
import { useModal, useTable } from '../../hooks';
import { dataFormat } from '../../utils';
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

const DELETE_PERMISSION = gql`
  mutation deletePermission($id: Int!) {
    deletePermission(id: $id) {
      id
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

const PermissionPage = () => {
  const { ps, pn, handleOnChange, pagination } = useTable();

  const { data, loading } = useQuery<
    {
      permissions: PermissionsPagination;
    },
    BasePageArgs
  >(PERMISSION_PAGE, {
    variables: { ps, pn },
  });

  const [deletePermission] = useMutation(DELETE_PERMISSION, {
    onCompleted: () => message.success('权限删除成功'),
    refetchQueries: () => [{ query: PERMISSION_PAGE, variables: { pn, ps } }],
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
      render: (text: string) => dataFormat(text),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_: string, record: Permission) => (
        <TableColumsDelete
          id={record.id}
          onClick={async () => deletePermission({ variables: { id: Number(record.id) } })}
        />
      ),
    },
  ];

  const permissionModel = useModal();

  const [createPermission, { loading: addLoading }] = useMutation(ADD_PERMISSION, {
    onCompleted: () => {
      permissionModel.closeModal();
      message.success('权限添加成功');
    },
    refetchQueries: () => [{ query: PERMISSION_PAGE, variables: { pn, ps } }],
  });

  const permissions = (data && data.permissions) || { totalSize: 0, list: [] };

  const handleCreatePermission = (permissionInput: NewPermissionInput) => {
    createPermission({
      variables: permissionInput,
    });
  };

  return (
    <div>
      <Authorize match="PERMISSION_CREATE">
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

      <PermissionModal loading={addLoading} {...permissionModel} createPermission={handleCreatePermission} />
    </div>
  );
};

export default authorize(PermissionPagePermission)(PermissionPage);
