

import { Table, Button } from 'antd';

import UserModal from './components/userModol';

import { dataFormat } from '../../utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import useToggle from '../../hooks/useToggle';

const EXCHANGE_USERS = gql`
  query Users  {
    isLoggedIn @client
    users {
      id
      phone
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


export default function() {
  const { loading, data } = useQuery(EXCHANGE_USERS);
  const [ show, toggle ] = useToggle(false);

   const [addUser, { loading: addLoading }] = useMutation(CREATE_USER, 
    {
      update(cache, { data: { addUser } }) {
        const { users } = cache.readQuery({ query: EXCHANGE_USERS });
        cache.writeQuery({
          query: EXCHANGE_USERS,
          data: { users: users.concat([addUser]) },
        });
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
