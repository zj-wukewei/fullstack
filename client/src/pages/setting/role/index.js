import { Row, Col } from 'antd';
import RoleList from './components/roleList';
import Permission from './components/permission';

import './index.less';

const Role = () => {
  return (
    <>
      <Row>
        <Col span={8} push={16}>
            <Permission />
        </Col>
        <Col span={16} pull={8}>
           <RoleList />
        </Col>
      </Row>
    </>
  );
};

export default Role;
