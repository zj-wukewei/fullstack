import React from 'react';
import { Layout, Menu, Dropdown, Spin, Icon } from 'antd';
import router from 'umi/router';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthUser } from '@users/common/src/models';
import { loginOut } from '../utils/apollo';
import useToggle from '../hooks/useToggle';

import LayoutSider from '../components/layoutSider';

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
      roles
      permission
    }
  }
`;

interface BasicLayoutProps {
  match: { url: string };
  children?: ((props: any) => React.ReactNode) | React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const [collapsed, toggle] = useToggle(false);

  const { loading, data } = useQuery<{
    whoAmI: AuthUser;
  }>(EXCHANGE_WHOAMI, {
    onCompleted: ({ whoAmI }) => {
      if (!whoAmI.info) {
        router.push(`/users/info/${whoAmI.id}`);
      }
    },
  });
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
      <Layout>
        <LayoutSider
          collapsed={collapsed}
          match={props.match}
          permission={data && data.whoAmI && data.whoAmI.permission}
        />

        <Layout className="layout">
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => toggle()} />

            <Dropdown overlay={menu} placement="bottomLeft">
              <div className="user-info">{data && data.whoAmI && data.whoAmI.info && data.whoAmI.info.name}</div>
            </Dropdown>
          </Header>
          <Content style={{padding: '10px'}}>
           {props.children}
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default BasicLayout;
