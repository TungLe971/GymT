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
      key: 'sub1',
      icon: <MailOutlined />,
      children: [
        { label: 'Option 1', key: '1' },
        { label: 'Option 2', key: '2' },
        { label: 'Option 3', key: '3' },
        { label: 'Option 4', key: '4' },
      ],
    },
    {
      label: 'Members',
      key: 'sub2',
      icon: <AppstoreOutlined />,
      children: [
        { label: 'Option 5', key: '5' },
        { label: 'Option 6', key: '6' },
        {
          label: 'Submenu',
          key: 'sub3',
          children: [
            { label: 'Option 7', key: '7' },
            { label: 'Option 8', key: '8' },
          ],
        },
      ],
    },
    {
      label: 'Staffs',
      key: 'sub4',
      icon: <SettingOutlined />,
      children: [
        { label: 'Option 9', key: '9' },
        { label: 'Option 10', key: '10' },
        { label: 'Option 11', key: '11' },
        { label: 'Option 12', key: '12' },
      ],
    },
    {
      label: 'Foods',
      key: 'sub5',
      icon: <MailOutlined />,
      children: [
        { label: 'Option 1', key: '12' },
        { label: 'Option 24', key: '21' },
        { label: 'Option 3', key: '31' },
        { label: 'Option 4', key: '41' },
      ],
    },
    {
      label: 'Events',
      key: 'sub6',
      icon: <MailOutlined />,
      children: [
        { label: 'Option 11', key: '16' },
        { label: 'Option 28', key: '142' },
        { label: 'Option 32', key: '384' },
        { label: 'Option 41', key: '484' },
      ],
    },
    {
      label: 'Equipments',
      key: 'sub7',
      icon: <MailOutlined />,
      children: [
        { label: 'Option 1', key: '15' },
        { label: 'Option 2', key: '28' },
        { label: 'Option 3', key: '73' },
        { label: 'Option 4', key: '74' },
      ],
    },
    {
      label: 'Statistical',
      key: 'sub8',
      icon: <MailOutlined />,
      children: [
        { label: 'Option 1', key: '1' },
        { label: 'Option 2', key: '2' },
        { label: 'Option 3', key: '3' },
        { label: 'Option 4', key: '4' },
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
          {item.children.map((child) => (
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
