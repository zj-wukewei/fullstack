

import { Table } from 'antd';
import { dataFormat } from '../../utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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


export default function() {
  const { loading, data } = useQuery(EXCHANGE_USERS);
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
    <Table
       rowKey="id" 
       size='small'
       dataSource={data ? data.users : []} 
       columns={columns}
       loading={loading}
       pagination={false} />
      
  );
}
