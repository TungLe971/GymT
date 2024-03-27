import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import requestApi from '../../helpers/api';
// import './Dashboard.css';

const { Title } = Typography;

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    requestApi('/users', 'GET', [])
      .then((response) => {
        console.log(response);
        setTotalUsers(response.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="card-court" style={{ padding: 20, width: '100%' }}>
      <Title level={2}>Hiện trạng thực tại</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total Users" extra={<UserOutlined />} bordered={false}>
            <p className="total-users">{totalUsers}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Warning Card" bordered={false}>
            Warning Card Content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Hội viên" bordered={false}>
            Total Member
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Nhân Viên" bordered={false}>
            Total Staff
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
