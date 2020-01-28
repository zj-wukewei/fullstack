import React from 'react';
import { gql } from 'apollo-boost';
import router from 'umi/router';
import { UsersPagination, UserInfo } from '@users/common/src/models';
import { BasePageArgs, NewUserInput } from '@users/common/src/dto';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, Button, message } from 'antd';
import { Authorize, authorize, PageContent } from '../../components';

import { dataFormat } from '../../utils';
import UserModal from './components/userModal';
import { useModal, useTable } from '../../hooks';
import { UserPagePermission } from '../../configs/router';

const EXCHANGE_USERS_PAGE = gql`
  query($ps: Int!, $pn: Int!) {
    users(ps: $ps, pn: $pn) {
      totalSize
      list {
        id
        phone
        info {
          id
          name
          address
          age
        }
        createDate
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($phone: String!) {
    createUser(newUserData: { phone: $phone }) {
      id
      phone
      createDate
    }
  }
`;

const USERS_SUBSCRIPTION = gql`
  subscription onUserCreated {
    userCreated {
      id
      phone
      info {
        id
        name
        address
        age
      }
      createDate
    }
  }
`;

const Users = () => {
  const { ps, pn, handleOnChange, pagination } = useTable();

  const { data, loading, subscribeToMore } = useQuery<
    {
      users: UsersPagination;
    },
    BasePageArgs
  >(EXCHANGE_USERS_PAGE, {
    variables: { ps, pn },
  });

  const users = (data && data.users) || { totalSize: 0, list: [] };

  const userModel = useModal();

  const [createUser, { loading: addLoading }] = useMutation(CREATE_USER, {
    onCompleted() {
      userModel.closeModal();
      message.success('用户添加成');
    },
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '姓名',
      dataIndex: 'info',
      key: 'info',
      render: (info: UserInfo) => (info && info.name) || '',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text: string) => dataFormat(text),
    },
  ];

  const handleCreateUser = (userInput: NewUserInput) => {
    createUser({
      variables: userInput,
    });
  };

  return (
    <PageContent>
      <Authorize match="USER_CREATE">
        <Button type="primary" onClick={() => userModel.openModal()}>
          添加
        </Button>
      </Authorize>
      <Table
        rowKey="id"
        style={{ marginTop: '10px' }}
        size="small"
        dataSource={users.list}
        columns={columns}
        loading={loading}
        onChange={handleOnChange}
        onRowClick={record => {
          router.push(`users/info/${record.id}`);
        }}
        pagination={{
          total: users.totalSize,
          ...pagination,
        }}
      />

      <UserModal loading={addLoading} {...userModel} createUser={handleCreateUser} />
    </PageContent>
  );
};

export default authorize(UserPagePermission)(Users);
