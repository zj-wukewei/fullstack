
import useUsers from '../hooks/useUsers';

import { Table } from 'antd';
import { dataFormat } from '../utils';

export default function() {
  const { data } = useUsers();
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
       dataSource={data ? data.getUsers : []} 
       columns={columns}
       loading={!data}
       pagination={false} />
      
  );
}
