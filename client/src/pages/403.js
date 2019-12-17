import { Result, Button } from 'antd';
import Link from 'umi/link';

const NOTAUTH = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Link to="/home"><Button type="primary">Back Home</Button></Link>}
    />
  );
};

export default NOTAUTH;
