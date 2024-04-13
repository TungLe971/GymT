import React, { useEffect, useState } from 'react';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'antd';
import './Dashboard.css';

const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promiseUser = requestApi('/users', 'GET');
    const promisePost = requestApi('/posts', 'GET');
    const promiseMember = requestApi('/members', 'GET');
    const promiseStaff = requestApi('/staffs', 'GET');
    const promiseCard = requestApi('/cards', 'GET');

    dispatch(actions.controlLoading(true));
    Promise.all([promiseUser, promisePost, promiseMember, promiseStaff, promiseCard])
      .then((res) => {
        console.log('res =>', res);
        setDashboardData({
          totalUser: res[0].data.total,
          totalPost: res[1].data.total,
          totalMember: res[2].data.total,
          totalStaff: res[3].data.total,
          totalCard: res[4].data.total,
        });
        setLoading(false);
        dispatch(actions.controlLoading(false));
      })
      .catch((error) => {
        console.log('error => ', error);
        setLoading(false);
        dispatch(actions.controlLoading(false));
      });
  }, [dispatch]);

  return (
    <div className="abc" id="abc">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4" style={{ color: 'white' }}>
            Dashboard
          </h1>

          <div className="row-dash">
            <div className="row-dash-small">
              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Users"
                  bordered={false}
                  style={{ width: 240, height: 170, background: '#37f557' }}
                  extra={<Badge count={dashboardData.totalUser} />}
                >
                  <Meta title={<Link to="/user">View Details</Link>} />
                </Card>
              </div>

              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Post"
                  style={{ width: 240, height: 170, background: 'rgb(189, 202, 0)' }}
                  extra={<Badge count={dashboardData.totalPost} />}
                >
                  <Meta title={<Link to="/post">View Details </Link>} />
                </Card>
              </div>
            </div>

            <div className="row-dash-small">
              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Member"
                  style={{ width: 240, height: 170, background: 'rgb(207, 63, 255)' }}
                  extra={<Badge count={dashboardData.totalMember} />}
                >
                  <Meta title={<Link to="/member">View Details</Link>} />
                </Card>
              </div>
              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Staff"
                  style={{ width: 240, height: 170, background: 'rgb(63, 133, 255)' }}
                  extra={<Badge count={dashboardData.totalStaff} />}
                >
                  <Meta title={<Link to="/staff">View Details</Link>} />
                </Card>
              </div>
            </div>

            <div className="row-dash-small">
              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(0, 134, 144)' }}
                  title="Total Card"
                  extra={<Badge count={dashboardData.totalCard} />}
                >
                  <Meta title={<Link to="/card">View Details</Link>} />
                </Card>
              </div>

              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(156, 81, 0)' }}
                  title="Total Statistical"
                  extra={<Badge count={dashboardData.totalStatistical} />}
                >
                  <Meta title={<Link to="/statistical">View Details</Link>} />
                </Card>
              </div>
            </div>
            <div className="row-dash-small">
              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(187, 0, 87)' }}
                  title="Total Warring"
                  extra={<Badge count={dashboardData.totalWarring} />}
                >
                  <Meta title={<Link to="/user">View Details</Link>} />
                </Card>
              </div>

              <div className="col-xl-3 col-md-6">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(0, 156, 55)' }}
                  title="Total Rule"
                  extra={<Badge count={dashboardData.totalRule} />}
                >
                  <Meta title={<Link to="/rule">View Details</Link>} />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
