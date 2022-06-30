import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
const MenuItem = Menu.Item;

const MenuComponent = ({menuList}) => {
  MenuComponent.initialState = {
    collapsed: true
  };
  return (
    <Menu
      theme='dark'
      mode='vertical'
      style={{textAlign: 'center'}}
      defaultSelectedKeys={[menuList[0].id]}>
      <MenuItem key={menuList[0].id}>
        <Link  to={menuList[0].path}>
          <Icon type='team'></Icon>
          <span className="nav-text">{menuList[0].text}</span>
        </Link>
      </MenuItem>
      <MenuItem key={menuList[1].id}>
        <Link to={menuList[1].path}>
          <Icon type='layout'></Icon>
          <span className="nav-text">{menuList[1].text}</span>
        </Link>
      </MenuItem>
    </Menu>
  );
}

MenuComponent.propTypes = {
  menuList: PropTypes.array.isRequired
};

export default MenuComponent;