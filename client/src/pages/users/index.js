import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, Button } from 'antd';

import { dataFormat } from '../../utils';
import { gql } from 'apollo-boost';
import useToggle from '../../hooks/useToggle';
import UserModal from './components/userModol';
import useTable from '../../hooks/useTable';

const EXCHANGE_USERS_PAGE = gql`
  query UsersPage($ps: Int!, $pn: Int!)  {
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
    mutation addUser($phone: String!) {
     addUser(newUserData: {
       phone: $phone
     }) {
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

export default function() {

  const { ps, pn, handleOnChange, pagination } = useTable();

  const { data, loading, subscribeToMore } = useQuery(EXCHANGE_USERS_PAGE, {
     variables: { ps, pn }
   });

  const users = data && data.usersPage || { totalSize: 0, list: [] }
  const [ show, toggle ] = useToggle(false);

  useEffect(() => {
     subscribeToMore({
          document: USERS_SUBSCRIPTION,
          variables: {ps, pn},
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newUserItem = subscriptionData.data.userCreated;
            return Object.assign({}, prev, {
              usersPage: {
                 ...prev.usersPage,
                 totalSize: prev.usersPage.totalSize + 1,
                 list: [newUserItem, ...prev.usersPage.list]
              }
            });
          }
        })
  }
  , [pn, ps, subscribeToMore]);

   const [addUser, { loading: addLoading }] = useMutation(CREATE_USER, {
     onCompleted() {        
       toggle();
     }
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
      render: (info) => info && info.name || ''
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text) =>  dataFormat(text)
    },
   
  ];

  return (
    <div>
      <Button type="primary" onClick={toggle}>添加</Button>
      <Table
        rowKey="id" 
        style={{ marginTop: '10px' }}
        size='small'
        dataSource={users.list}
        columns={columns}
        loading={loading}
        onChange={handleOnChange}
        pagination={{
          total: users.totalSize,
          ...pagination
        }} />
       
        <UserModal loading={addLoading} visible={show} addUser={addUser}  onCancel={() => toggle()}  />
    </div>  
  );
}
