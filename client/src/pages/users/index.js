import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, Button } from 'antd';

import Authorize, { authorize } from '../../components/authorize';

import { dataFormat } from '../../utils';
import { gql } from 'apollo-boost';
import useModal from '../../hooks/useModal';
import UserModal from './components/userModal';
import useTable from '../../hooks/useTable';
import { UserPagePermission } from '../../configs/router';

const EXCHANGE_USERS_PAGE = gql`
  query UsersPage($ps: Int!, $pn: Int!) {
    usersPage(ps: $ps, pn: $pn) {
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

  const { data, loading, subscribeToMore } = useQuery(EXCHANGE_USERS_PAGE, {
    variables: { ps, pn },
  });

  const users = (data && data.usersPage) || { totalSize: 0, list: [] };

  const userModel = useModal();

  useEffect(() => {
    subscribeToMore({
      document: USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUserItem = subscriptionData.data.userCreated;
        return Object.assign({}, prev, {
          usersPage: {
            ...prev.usersPage,
            totalSize: prev.usersPage.totalSize + 1,
            list: [newUserItem, ...prev.usersPage.list],
          },
        });
      },
    });
  }, [subscribeToMore]);

  const [createUser, { loading: addLoading }] = useMutation(CREATE_USER, {
    onCompleted() {
      userModel.closeModal();
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
      render: info => (info && info.name) || '',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: text => dataFormat(text),
    },
  ];

  return (
    <div>
      <Authorize match={'USER_CREATE'}>
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
        pagination={{
          total: users.totalSize,
          ...pagination,
        }}
      />

      <UserModal loading={addLoading} {...userModel} createUser={createUser} />
    </div>
  );
};

export default authorize(UserPagePermission)(Users);
