import React, { useState, useEffect } from 'react';
import './CardAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, DatePicker, Button, Select } from 'antd';

const { Option } = Select;

const CardAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [defaultStatus, setDefaultStatus] = useState('1');
  const [members, setMembers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [packagess, setPackages] = useState([]);
  const [classrooms, setClassroom] = useState([]);

  useEffect(() => {
    fetchMembers();
    fetchStaffs();
    fetchPackages();
    fetchClassroom();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await requestApi('/members', 'GET');
      if (res.data.data !== null && Array.isArray(res.data.data)) {
        setMembers(res.data.data);
      } else {
        console.error('Members data is not an array:', res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const fetchStaffs = async () => {
    try {
      const res = await requestApi('/staffs', 'GET');
      if (res.data.data !== null && Array.isArray(res.data.data)) {
        setStaffs(res.data.data);
      } else {
        console.error('Staff data is not an array:', res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch staffs:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await requestApi('/packagess', 'GET');
      if (res.data.data !== null && Array.isArray(res.data.data)) {
        setPackages(res.data.data);
      } else {
        console.error('Packages data is not an array:', res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    }
  };

  const fetchClassroom = async () => {
    try {
      const res = await requestApi('/classrooms', 'GET');
      if (res.data.data !== null && Array.isArray(res.data.data)) {
        setClassroom(res.data.data);
      } else {
        console.error('classroom data is not an array:', res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch classroom:', error);
    }
  };

  const handleSubmitFormAdd = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/cards', 'POST', data);
      console.log('res=> ', res);
      message.success('Thêm thành công!', 2);
      setTimeout(() => navigate('/card'), 1000);
    } catch (error) {
      console.error('Failed to add card:', error);
      message.error('Failed to add card. Please try again later.');
    }
    dispatch(actions.controlLoading(false));
  };

  return (
    <div className="bg-primary-card">
      <div className="container-card">
        <div className="card-header-card">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Create Card
          </h3>
        </div>
        <div className="card-body-card">
          <div className="label-add-card">
            <label>Hội viên:</label>
            <label>Nhân viên:</label>
            <label>Gói:</label>
            <label>Lớp:</label>
            <label>Trạng thái:</label>
            <label>Thành tiền:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>

          <div className="input-add-card">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="member" rules={[{ required: true, message: 'Please select a member' }]}>
                <Select placeholder="Select a member" showSearch optionFilterProp="children">
                  {members.map((hv) => (
                    <Option key={hv.id_hv} value={hv.id_hv}>
                      {`${hv.id_hv}, ${hv.name_hv}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="staff" rules={[{ required: true, message: 'Please select a staff' }]}>
                <Select placeholder="Select a staff" showSearch optionFilterProp="children">
                  {staffs.map((nv) => (
                    <Option key={nv.id_nv} value={nv.id_nv}>
                      {`${nv.id_nv}, ${nv.name_nv}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="packages" rules={[{ required: true, message: 'Please select a package' }]}>
                <Select placeholder="Select a package" showSearch optionFilterProp="children">
                  {packagess.map((pkg) => (
                    <Option key={pkg.id_packages} value={pkg.id_packages}>
                      {`${pkg.name_packages}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="classroom" rules={[{ required: true, message: 'Please select a classroom' }]}>
                <Select placeholder="Select a classroom" showSearch optionFilterProp="children">
                  {classrooms.map((clr) => (
                    <Option key={clr.id_classroom} value={clr.id_classroom}>
                      {`${clr.name_classroom}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="status" initialValue={defaultStatus}>
                <Select onChange={(value) => setDefaultStatus(value)}>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item name="total_money_card" rules={[{ required: true, message: 'Please select a package' }]}>
                <Select placeholder="Select a package" showSearch optionFilterProp="children">
                  {packagess.map((pkg) => (
                    <Option key={pkg.total_money_card} value={pkg.gia_packages}>
                      {`${pkg.name_packages} - ${pkg.gia_packages}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="ngay_start" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                />
              </Form.Item>

              <Form.Item name="ngay_end" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                />
              </Form.Item>

              <Form.Item className="it_end">
                <Button className="btn-primary-card" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdd;
