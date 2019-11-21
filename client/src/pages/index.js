
import useUsers from '../hooks/useUsers';

import { Table } from 'antd';

export default function() {
  const { data } = useUsers();
  const columns = [
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '来自',
      dataIndex: 'appType',
      key: 'appType',
    },
    {
      title: '机型',
      dataIndex: 'appModel',
      key: 'appModel',
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
