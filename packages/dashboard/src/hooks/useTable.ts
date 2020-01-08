import { useState, useCallback } from 'react';
import { PaginationConfig } from 'antd/lib/pagination';

const useTable = () => {
  const [pn, setPn] = useState(0);
  const [ps, setPs] = useState(10);

  const handleOnChange = useCallback((pagination: PaginationConfig) => {
    setPn(pagination.current ? pagination.current - 1 : 0);
    setPs(pagination.pageSize || 10);
  }, []);

  return {
    pn,
    ps,
    handleOnChange,
    pagination: {
      showSizeChanger: true,
      current: pn + 1,
      pageSize: ps,
    },
  };
};

export default useTable;
