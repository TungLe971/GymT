import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import './Sidebar.css';

const { SubMenu } = Menu;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

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
      key: 'sub2',
      icon: <AppstoreOutlined />,
      items: [
        { label: 'Member List', key: '5' },
        { label: 'Schedule', key: '6' },
        {
          label: 'Submenu',
          key: 'sub3',
          items: [
            { label: 'Health', key: '7' },
            { label: 'Personal Trainer', key: '8' },
          ],
        },
      ],
    },
    {
      label: 'Staffs',
      key: 'sub4',
      icon: <SettingOutlined />,
      items: [
        { label: 'Staff List', key: '9' },
        { label: 'Calendar', key: '10' },
        { label: 'Option 11', key: '11' },
        { label: 'Option 12', key: '12' },
      ],
    },
    {
      label: 'Foods',
      key: 'sub5',
      icon: <MailOutlined />,
      items: [
        { label: 'Food List', key: '31' },
        { label: 's', key: '41' },
      ],
    },
    {
      label: 'Events',
      key: 'sub6',
      icon: <MailOutlined />,
      items: [
        { label: 'Event List', key: '384' },
        { label: 'Option 41', key: '484' },
      ],
    },
    {
      label: 'Equipments',
      key: 'sub7',
      icon: <MailOutlined />,
      items: [
        { label: 'Equipments List', key: '15' },
        { label: 'Option 2', key: '28' },
      ],
    },
    {
      label: 'Statistical',
      key: 'sub8',
      icon: <MailOutlined />,
      items: [
        { label: 'Revenue', key: '3' },
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
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ display: Flex, width: 256, height: '100vh' }}
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
