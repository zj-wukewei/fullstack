import { Result, Button } from 'antd';
import Link from 'umi/link';

const NOTPAGEFIND = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/home">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NOTPAGEFIND;
