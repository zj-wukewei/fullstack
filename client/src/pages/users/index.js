

import { Table, Button } from 'antd';

import UserModal from './components/userModol';

import { dataFormat } from '../../utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import useToggle from '../../hooks/useToggle';
import { useEffect } from 'react';

const EXCHANGE_USERS = gql`
  query Users  {
    isLoggedIn @client
    users {
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
  const { loading, data, subscribeToMore } = useQuery(EXCHANGE_USERS);
  const [ show, toggle ] = useToggle(false);

  useEffect(() => {
     subscribeToMore({
          document: USERS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newUserItem = subscriptionData.data.userCreated;
            return Object.assign({}, prev, {
              users: [newUserItem, ...prev.users]
            });
          }
        })
  }
  , [subscribeToMore]);

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
        dataSource={data ? data.users : []} 
        columns={columns}
        loading={loading}
        pagination={false} />
       
        <UserModal loading={addLoading} visible={show} addUser={addUser}  onCancel={() => toggle()}  />
    </div>  
  );
}
