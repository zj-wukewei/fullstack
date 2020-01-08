import React from 'react';
import { Popconfirm, Button } from 'antd';

interface TableColumsDeleteProps {
  id: number;
  onClick: () => void;
}

const TableColumsDelete: React.SFC<TableColumsDeleteProps> = props => {
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
