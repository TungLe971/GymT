import React from 'react';
import './StaffAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, Input, Select, Button, DatePicker } from 'antd';

const { Option } = Select;

const StaffAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/staffs', 'Post', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Thêm nhân viên thành công!', 2);
      setTimeout(() => navigate('/staff'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary1">
      <div className="container1">
        <div className="card-header1">
          <h3 className="text-header1" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Create Staff
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add1">
            <label>Name:</label>
            <label>Ngày sinh:</label>
            <label>Giới tính:</label>
            <label>Tuổi:</label>
            <label>SĐT:</label>
            <label>TCCCD:</label>
            <label>Biển xe:</label>
            <label>Chức vụ:</label>
            <label>Email:</label>
            <label>Địa chỉ:</label>
          </div>
          <div className="input-add1">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="name_nv" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item name="ngay_sinh_nv" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                />
              </Form.Item>

              <Form.Item name="gioi_tinh_nv" rules={[{ required: true, message: 'Gender is required' }]}>
                <Select style={{ width: '17rem' }} placeholder="Select gender">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item name="tuoi_nv" rules={[{ required: true, message: 'Year old is required' }]}>
                <Input placeholder="Enter your year old" type="number" />
              </Form.Item>

              <Form.Item name="sdt_nv" rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input placeholder="Enter your phone number" type="number" />
              </Form.Item>

              <Form.Item name="tcccd_nv" rules={[{ required: true, message: 'CCCD is required' }]}>
                <Input placeholder="Enter your CCCD" type="number" />
              </Form.Item>

              <Form.Item name="bien_xe_nv" rules={[{ required: true, message: 'License plates is required' }]}>
                <Input placeholder="Enter your license plates" />
              </Form.Item>

              <Form.Item name="chuc_vu" rules={[{ required: true, message: 'Position is required' }]}>
                <Select placeholder="Select position">
                  <Option value="Quản lý">Quản lý</Option>
                  <Option value="Lễ tân">Lễ tân</Option>
                  <Option value="PT">PT</Option>
                  <Option value="PT">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="email_nv"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>

              <Form.Item name="dia_chi_nv" rules={[{ required: true, message: 'Address is required' }]}>
                <Input placeholder="Enter your Address" />
              </Form.Item>

              <Form.Item className="it_end1">
                <Button className="btn-primary12" type="primary" htmlType="submit">
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

export default StaffAdd;
