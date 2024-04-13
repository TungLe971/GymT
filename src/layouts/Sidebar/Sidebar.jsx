import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  RocketFilled,
  QqCircleFilled,
  PieChartFilled,
  CreditCardFilled,
  StarFilled,
  TagFilled,
  HeartFilled,
  SlackCircleFilled,
  CrownFilled,
  BellFilled,
  FireFilled,
} from '@ant-design/icons';
import './Sidebar.css';

const { SubMenu } = Menu;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['gymt']);

  const items = [
    {
      label: 'Users',
      key: 'users',
      icon: <RocketFilled />,
      items: [
        { label: 'User List', key: 'user' },
        { label: 'Post', key: 'post' },
      ],
    },
    {
      label: 'Members',
      key: 'members',
      icon: <CrownFilled />,
      items: [
        { label: 'Member List', key: 'member' },
        { label: 'Schedule', key: 'schedule' },
        { label: 'Health', key: 'health' },
        { label: 'Personal Trainer', key: 'pt' },
      ],
    },
    {
      label: 'Cards',
      key: 'cards',
      icon: <CreditCardFilled />,
      items: [
        { label: 'Card List', key: 'card' },
        { label: 'Card status', key: '6c' },
      ],
    },
    {
      label: 'Staffs',
      key: 'staffs',
      icon: <QqCircleFilled />,
      items: [
        { label: 'Staff List', key: 'staff' },
        { label: 'Calendar', key: '10' },
      ],
    },
    {
      label: 'Classroom',
      key: 'classrooms',
      icon: <FireFilled />,
      items: [
        { label: 'Classroom List', key: 'classroom' },
        { label: 'Schedule', key: '100' },
      ],
    },
    {
      label: 'Packages',
      key: 'packagess',
      icon: <TagFilled />,
      items: [{ label: 'Packages', key: 'packages' }],
    },
    {
      label: 'Foods',
      key: 'foods',
      icon: <HeartFilled />,
      items: [
        { label: 'Food List', key: 'food' },
        { label: 's', key: '41' },
      ],
    },
    {
      label: 'Events',
      key: 'events',
      icon: <StarFilled />,
      items: [
        { label: 'Event List', key: 'event' },
        { label: 'Option 41', key: '484' },
      ],
    },
    {
      label: 'Equipments',
      key: 'equipments',
      icon: <SlackCircleFilled />,
      items: [
        { label: 'Equipments List', key: 'equipment' },
        { label: 'Option 2', key: '28' },
      ],
    },
    {
      label: 'Statisticals',
      key: 'statisticals',
      icon: <PieChartFilled />,
      items: [
        { label: 'Revenue', key: 'statistical' },
        { label: 'Member', key: '4' },
        { label: 'Staff', key: '565' },
        { label: 'Food', key: '4897' },
      ],
    },
    {
      label: 'Notification',
      key: 'Notification',
      icon: <BellFilled />,
      items: [{ label: 'Notification', key: 'notification' }],
    },
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      className="sidebar"
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
