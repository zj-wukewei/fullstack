import { Layout, Menu, Icon } from 'antd';
import Rcon from '../rcon';

import { masterRoute } from '../../configs/router';
import { checkIsAdmin } from '../../utils/permission';

const { Sider } = Layout;

const { SubMenu } = Menu;

const checkPermission = (match, permission) => {

    if(checkIsAdmin(permission)) {
        return true;
    }

    if (match.includes('|')) {
        return match
          .split('|')
          .map(p => p.trim())
          .some(k => permission.includes(k));
      }
    
    return permission.includes(permission);
};

const renderSubMenu = permission => {
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
            { menu.children.map(subMenu => renderMenuItem(subMenu, permission)) }
        </SubMenu>
      );
    }

    return renderMenuItem(menu, permission);
  });
};

const renderMenuItem = (subMenu, permission) => {
  if (checkPermission(subMenu.permission, permission) || subMenu.allow) {
    return (
      <Menu.Item key={subMenu.path}>
        <Rcon type={subMenu.icon} />
        <span> {subMenu.name}</span>
      </Menu.Item>
    );
  }

  return null;
};

const LayoutSider = props => {
  const { collapsed, permission } = props;
  console.log('LayoutSider', permission);
  return (
    <Sider collapsedWidth={0} trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        {/* <SubMenu
          key={'user'}
          title={
            <span>
              <Icon type="user" />
              用户
            </span>
          }
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>用户</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Rcon type="icon-role" />
            <span>角色</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>权限</span>
          </Menu.Item>
        </SubMenu> */}
        {permission && renderSubMenu(permission)}
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
