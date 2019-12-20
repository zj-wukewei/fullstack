import { Popconfirm, Button } from 'antd';

const TableColumsDelete = props => {
  const { id, onClick } = props;
  return (
    <div>
      <Popconfirm title={`确定要删除id#${id}吗？`} onConfirm={onClick}>
        <Button icon="delete" size="small" />
      </Popconfirm>
    </div>
  );
};

export default TableColumsDelete;
