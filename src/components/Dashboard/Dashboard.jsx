/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Card, Badge, Drawer } from 'antd';
import './Dashboard.css';

const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const promiseUser = requestApi('/users', 'GET');
    const promisePost = requestApi('/posts', 'GET');
    const promiseMember = requestApi('/members', 'GET');
    const promiseStaff = requestApi('/staffs', 'GET');
    const promiseCard = requestApi('/cards', 'GET');
    const promiseClassroom = requestApi('/classrooms', 'GET');

    dispatch(actions.controlLoading(true));
    Promise.all([promiseUser, promisePost, promiseMember, promiseStaff, promiseCard, promiseClassroom])
      .then((res) => {
        console.log('res =>', res);
        setDashboardData({
          totalUser: res[0].data.total,
          totalPost: res[1].data.total,
          totalMember: res[2].data.total,
          totalStaff: res[3].data.total,
          totalCard: res[4].data.total,
          totalClassroom: res[5].data.total,
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="abc" id="abc">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4" style={{ color: 'white' }}>
            Dashboard
          </h1>

          <div className="row-dash">
            <div className="row-dash-small">
              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Users"
                  bordered={false}
                  style={{ width: 240, height: 170, background: '#37f557' }}
                  extra={<Badge count={dashboardData.totalUser} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/user">View Details</Link>} />
                </Card>
              </div>

              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Post"
                  style={{ width: 240, height: 170, background: 'rgb(189, 202, 0)' }}
                  extra={<Badge count={dashboardData.totalPost} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/post">View Details </Link>} />
                </Card>
              </div>
            </div>

            <div className="row-dash-small">
              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Member"
                  style={{ width: 240, height: 170, background: 'rgb(207, 63, 255)' }}
                  extra={<Badge count={dashboardData.totalMember} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/member">View Details</Link>} />
                </Card>
              </div>

              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  title="Total Staff"
                  style={{ width: 240, height: 170, background: 'rgb(63, 133, 255)' }}
                  extra={<Badge count={dashboardData.totalStaff} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/staff">View Details</Link>} />
                </Card>
              </div>
            </div>

            <div className="row-dash-small">
              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(0, 134, 144)' }}
                  title="Total Card"
                  extra={<Badge count={dashboardData.totalCard} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/card">View Details</Link>} />
                </Card>
              </div>

              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(156, 81, 0)' }}
                  title="Total Class"
                  extra={<Badge count={dashboardData.totalClassroom} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/classroom">View Details</Link>} />
                </Card>
              </div>
            </div>
            <div className="row-dash-small">
              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(187, 0, 87)' }}
                  title="Card Warring"
                  extra={<Badge count={dashboardData.totalWarring} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<Link to="/cardwarring">View Details</Link>} />
                </Card>
              </div>

              <div className="dash-card ">
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240, height: 170, background: 'rgb(0, 156, 55)' }}
                  title="Total Rule"
                  extra={<Badge count={dashboardData.totalRule} />}
                >
                  <Meta style={{ marginTop: '2rem' }} title={<a onClick={showDrawer}>View Details</a>} />
                </Card>
              </div>
              <Drawer
                className="drawer-dash"
                title="Luật của phòng tập GymT"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={open}
                getContainer={false}
              >
                <h2>1. Trang phục phù hợp</h2>
                <p>
                  Trang phục mặc trong phòng gym nên là các trang phục thoáng mát, có độ thấm hút cao và dễ di chuyển,
                  vận động. Để đạt được hiệu quả tốt nhất khi tập luyện nên mặc đồ thể thao bằng thun và giày tập luyện.
                  Đối với nữ, lưu ý nên mặc áo ngực thể thao hơn so với áo ngực thông thường để tránh tình trạng gò bó,
                  gây cản trở khi tập luyện. Phục trang nhã nhặn, vừa phải, không quá gợi cảm, thiếu tế nhị ảnh hưởng
                  những người xung quanh.
                </p>
                <p>
                  Không mặc quần jean khi tập luyện vì loại vải jean thường dày, cứng, gây khó khăn khi vận động. Ngoài
                  ra, khi chạy bộ, học các lớp nhảy, lớp tập theo nhóm,... TUYỆT ĐỐI không mang dép lê, giày bệt hoặc đi
                  chân trần trong phòng gym bởi chân bạn có thể bị phồng rộp do ma sát liên tục hoặc chấn thương nghiêm
                  trọng sau này.
                </p>
                <h2>2. Giữ trật tự đúng mực, không làm phiền người khác</h2>
                <p>
                  Đây là một trong những trường hợp thường gặp nhất trong các lớp tập GymT. Sẽ chẳng thành vấn đề nếu
                  Người hướng dẫn và cả lớp cùng hát hò trong điệm Sh'bam cuồng nhiệt, gầm gừ trong những cú đá Body
                  Combat, nhưng nếu chỉ có 1 mình bạn hò reo trong lớp học, có lẽ bạn nên tiết chế sự hưng phấn của mình
                  lại để không làm các hội viên khác mất tập trung khi bước qua một động tác mới.
                </p>
                <h2>3. Lấy vé sớm, học đúng giờ</h2>
                <p>
                  Vào giờ cao điểm từ 6 giờ đến 8 giờ tối, các lớp học GymT sẽ rất đông và chỉ cần đôi phút chậm trễ,
                  bạn đã lỡ mất những chiếc vé cuối cùng. Nên bình tĩnh và chuyển sang các lớp học khác tiếp theo đó để
                  tham gia. Ngoài ra, nếu đã vào được lớp, nên nhanh chóng “xí phần” những vị trí dễ quan sát Người
                  hướng dẫn nhất để bảo đảm chất lượng buổi học. Đứng cách đều những người bên cạnh để tránh va chạm
                  mạnh.
                </p>
                <p>
                  Các lớp học thể dục theo nhóm cũng yêu cầu tính đúng giờ như bao lớp học thông thường khác. Xuất hiện
                  vào giữa buổi học sẽ rất nguy hiểm bởi bạn chưa được khởi động, sẽ dễ gây chấn thương, chưa kể việc
                  ảnh hưởng đến sự tập trung của các học viên khác. Đó cũng là lý do các lớp học Yoga đóng cửa đối với
                  các hội viên đi trễ. Vì thế, hãy ý thức và đến sớm hơn khi tập theo lớp!
                </p>
                <h2>4. Những vấn đề tế nhị đến từ mùi cơ thể</h2>
                <p>
                  Đây là 1 vấn đề rất tế nhị trong cuộc sống hằng ngày, và đặc biệt còn “cực kì tế nhị” hơn nữa trong
                  các lớp học theo nhóm. Bởi các trang phục trong phòng gym đa phần thấm hút mồ hôi và mùi rất nhanh,
                  bạn cần lưu ý kĩ hơn về mùi cơ thể của chính mình để không làm phiền đến người khác. Nếu bản thân quá
                  “nặng mùi”, đừng quên sử dụng sản phẩm khử mùi trước và sau khi tập để tránh gây ra những phiền hà
                  “khó nói”.
                </p>
                <h2>5. Khó tiêu, đầy hơi, hãy cân nhắc kĩ khi tham gia GymT</h2>
                <p>
                  Có một số động tác Yoga rất tốt cho hệ tiêu hóa và đôi khi đó cũng là lúc phiền hà xảy đến. Khi thực
                  hiện động tác, các khí Metan, Nitơ trong ruột sẽ được hỗ trợ đẩy ra ngoài và lắm lúc bạn vô tình trung
                  tiện ngay tại lớp học. Những hành động vô thức ấy sẽ vô tình làm ảnh hưởng đến không khí trang nghiêm,
                  yên tĩnh của lớp và người kế bên. Vì thế, khi gặp một số vấn đề tiêu hóa, ăn uống không tiêu, nên cân
                  nhắc kĩ các bộ môn tập luyện.
                </p>
                <h2>6. Trả dụng cụ về đúng vị trí ban đầu</h2>
                <p>
                  Sau khi tập tạ xong, nên trao trả chúng về vị trí ban đầu. Đó là hành động lịch sự và nhã nhặn nhất
                  bạn có thể làm cho những người cần dùng đến chúng sau đó. Tương tự với các dụng cụ khác, bạn nhé!
                </p>
              </Drawer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
