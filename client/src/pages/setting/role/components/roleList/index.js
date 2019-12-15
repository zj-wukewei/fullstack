import { Table } from 'antd';
import useTable from '../../../../../hooks/useTable';

const RoleList = () => {
  const { ps, pn, handleOnChange, pagination } = useTable();

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
    }
  ];


  return (
    <div>
      <Table
        rowKey="id" 
        style={{ marginRight: '20px' }}
        size='small'
        dataSource={[]}
        columns={columns}
        loading={false}
        title={() => "角色列表"}
        onChange={handleOnChange}
        pagination={{
          total: 0,
          ...pagination
        }} />
       
    </div>
  );
};

export default RoleList;
