import React from 'react';
import gql from 'graphql-tag';
import { Table, Button, message } from 'antd';
import router from 'umi/router';
import { RolesPagination } from '@users/common/src/models';
import { BasePageArgs, NewRoleInput } from '@users/common/src/dto';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Authorize, authorize, PageContent } from '../../components';
import { RolePagePermission } from '../../configs/router';
import { dataFormat } from '../../utils';
import { useModal, useTable } from '../../hooks';
import RoleModal from './components/roleModal';

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

  const { data, loading } = useQuery<
    {
      roles: RolesPagination;
    },
    BasePageArgs
  >(ROLES_PAGE, {
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
      render: (text: string) => dataFormat(text),
    },
  ];

  const roles = (data && data.roles) || { totalSize: 0, list: [] };

  const roleModel = useModal();

  const [createRole, { loading: addLoading }] = useMutation(ADD_ROLE, {
    onCompleted() {
      roleModel.closeModal();
      message.success('角色添加成功');
    },
    refetchQueries: () => [{ query: ROLES_PAGE, variables: { pn, ps } }],
  });

  const handleCreateRole = (roleInput: NewRoleInput) => {
    createRole({
      variables: roleInput,
    });
  };

  return (
    <PageContent>
      <Authorize match="ROLE_CREATE">
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

      <RoleModal loading={addLoading} {...roleModel} createRole={handleCreateRole} />
    </PageContent>
  );
};

export default authorize(RolePagePermission)(Roles);
