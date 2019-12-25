import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

import Rcon from '../rcon';
import { masterRoute, IMasterRoute } from '../../configs/router';
import { checkPermission } from '../../utils/permission';

const { Sider } = Layout;

const { SubMenu } = Menu;

const renderMenuItem = (subMenu: IMasterRoute, permission: string[]) => {
  if (checkPermission(subMenu.permission, permission) || subMenu.allow) {
    return (
      <Menu.Item key={subMenu.path}>
        <Link to={subMenu.path}>
          <Rcon type={subMenu.icon} />
          {subMenu.name}
        </Link>
      </Menu.Item>
    );
  }

  return null;
};

const renderSubMenu = (permission: string[]) => {
  return masterRoute.map(menu => {
    if (menu.children && (checkPermission(menu.permission, permission) || menu.allow)) {
      return (
        <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              {menu.name}
            </span>
          }
        >
          {menu.children.map((subMenu: IMasterRoute) => renderMenuItem(subMenu, permission))}
        </SubMenu>
      );
    }

    return renderMenuItem(menu, permission);
  });
};

interface LayoutSiderProps {
  collapsed: boolean;
  permission: string[] | undefined;
  match: { url: string };
}

const LayoutSider = (props: LayoutSiderProps) => {
  const {
    collapsed,
    permission,
    match: { url },
  } = props;
  const find = masterRoute.find(
    subMenu => subMenu.children && subMenu.children.find(menu => url.startsWith(menu.path)),
  );
  const uiOpenKeys = find ? find.path || '' : '';
  const findChuldren = find && find.children && find.children.find(item => url.startsWith(item.path));
  const uiSelectKey = findChuldren && findChuldren.path;

  return (
    <Sider collapsedWidth={0} trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultOpenKeys={[uiOpenKeys]} defaultSelectedKeys={[uiSelectKey || '']}>
        {permission && renderSubMenu(permission)}
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
