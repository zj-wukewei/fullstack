import React from 'react';
import { Layout, Menu, Dropdown, Spin } from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { loginOut } from '../utils/apollo';

import './index.less';

const { Header, Content } = Layout;
const EXCHANGE_WHOAMI = gql`
  query WhoAmI {
    whoAmI {
      id
      phone
      info {
        id
        name
        address
        age
      }
    }
  }
`;

function BasicLayout(props) {
  const { loading, data } = useQuery(EXCHANGE_WHOAMI);
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => loginOut()} style={{ width: '100px', textAlign: 'center' }}>
          退出
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Spin spinning={loading} tip="初始化中...">
      <Layout className="layout">
        <Header>
          <div className="logo" />

          <Dropdown overlay={menu} placement="bottomLeft">
            <div className="user-info">
              {data && data.whoAmI && data.whoAmI.info && data.whoAmI.info.name}
            </div>
          </Dropdown>
        </Header>
        <Content style={{ padding: '10px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: '4px' }}>
          { props.children }
          </div>
        </Content>
      </Layout>
    </Spin>
  );
}

export default BasicLayout;
