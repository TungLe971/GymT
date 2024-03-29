import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import './Sidebar.css';

const { SubMenu } = Menu;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['gymt']);

  const items = [
    {
      label: 'Users',
      key: 'users',
      icon: <MailOutlined />,
      items: [
        { label: 'User List', key: 'user' },
        { label: 'Post', key: 'post' },
      ],
    },
    {
      label: 'Members',
      key: 'members',
      icon: <AppstoreOutlined />,
      items: [
        { label: 'Member List', key: 'member' },
        { label: 'Schedule', key: '6' },
        { label: 'Health', key: '7' },
        { label: 'Personal Trainer', key: '8' },
      ],
    },
    {
      label: 'Cards',
      key: 'cards',
      icon: <AppstoreOutlined />,
      items: [
        { label: 'Card List', key: 'card' },
        { label: 'Card status', key: '6c' },
      ],
    },
    {
      label: 'Staffs',
      key: 'staffs',
      icon: <SettingOutlined />,
      items: [
        { label: 'Staff List', key: 'staff' },
        { label: 'Calendar', key: '10' },
        { label: 'Option 11', key: '11' },
        { label: 'Option 12', key: '12' },
      ],
    },
    {
      label: 'Packages',
      key: 'packagess',
      icon: <AppstoreOutlined />,
      items: [{ label: 'Packages', key: 'packages' }],
    },
    {
      label: 'Foods',
      key: 'foods',
      icon: <MailOutlined />,
      items: [
        { label: 'Food List', key: 'food' },
        { label: 's', key: '41' },
      ],
    },
    {
      label: 'Events',
      key: 'events',
      icon: <MailOutlined />,
      items: [
        { label: 'Event List', key: 'event' },
        { label: 'Option 41', key: '484' },
      ],
    },
    {
      label: 'Equipments',
      key: 'equipments',
      icon: <MailOutlined />,
      items: [
        { label: 'Equipments List', key: 'equipment' },
        { label: 'Option 2', key: '28' },
      ],
    },
    {
      label: 'Statisticals',
      key: 'statisticals',
      icon: <MailOutlined />,
      items: [
        { label: 'Revenue', key: 'statistical' },
        { label: 'Member', key: '4' },
        { label: 'Staff', key: '565' },
        { label: 'Food', key: '4897' },
      ],
    },
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256, height: '100vh' }}
    >
      {items.map((item) => (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.items.map((child) => (
            <Menu.Item key={child.key}>
              <Link to={`/${child.key}`}>{child.label}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default Sidebar;
