import { useState, useCallback } from 'react';

const useTable = () => {
  const [pn, setPn] = useState(0);
  const [ps, setPs] = useState(10);

  const handleOnChange = useCallback(pagination => {
    setPn(pagination.current - 1);
    setPs(pagination.pageSize);
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
