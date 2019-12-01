import { useState } from 'react';

import { Table, Button } from 'antd';

import UserModal from './components/userModol';

import { dataFormat } from '../../utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import useToggle from '../../hooks/useToggle';
import { useEffect } from 'react';

const EXCHANGE_USERS_PAGE = gql`
  query UsersPage($ps: Float!, $pn: Float!)  {
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

  const [pn, setPn] = useState(0);
  const [ps, setPs] = useState(10);

  const { data, loading, subscribeToMore } = useQuery(EXCHANGE_USERS_PAGE, {
     variables: { ps, pn }
   });

  const users = data && data.usersPage || { totalSize: 0, list: [] }
  const [ show, toggle ] = useToggle(false);

  useEffect(() => {
     subscribeToMore({
          document: USERS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newUserItem = subscriptionData.data.userCreated;
            return Object.assign({}, prev, {
              usersPage: {
                 totalSize: prev.totalSize +1,
                 list: [newUserItem, ...prev.usersPage.list]
              }
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

  const handleOnChange = (pagination) => {
    setPn(pagination.current - 1);
    setPs(pagination.pageSize);
  }

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
          showSizeChanger: true,
          total: users.totalSize,
          current: pn + 1,
          pageSize: ps
        }} />
       
        <UserModal loading={addLoading} visible={show} addUser={addUser}  onCancel={() => toggle()}  />
    </div>  
  );
}
