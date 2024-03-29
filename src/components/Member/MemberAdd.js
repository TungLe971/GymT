import React from 'react';
import './MemberAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, Input, Select, Button, DatePicker } from 'antd';

const { Option } = Select;

const MemberAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/members', 'Post', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Thêm hội viên thành công!', 2);
      setTimeout(() => navigate('/member'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary">
      <div className="container">
        <div className="card-header">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Create Member
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add">
            <label>Name:</label>
            <label>Ngày sinh:</label>
            <label>Giới tính:</label>
            <label>Tuổi:</label>
            <label>SĐT:</label>
            <label>TCCCD:</label>
            <label>Biển xe:</label>
            <label>Tích luỹ:</label>
            <label>Email:</label>
          </div>
          <div className="input-add">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="name_hv" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item name="ngay_sinh_hv" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                />
              </Form.Item>

              <Form.Item name="gioi_tinh_hv" rules={[{ required: true, message: 'Gender is required' }]}>
                <Select style={{ width: '17rem' }} placeholder="Select gender">
                  <Option value="1">Nam</Option>
                  <Option value="2">Nữ</Option>
                  <Option value="3">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item name="tuoi_hv" rules={[{ required: true, message: 'Year old is required' }]}>
                <Input placeholder="Enter your year old" type="number" />
              </Form.Item>

              <Form.Item name="sdt_hv" rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input placeholder="Enter your phone number" type="number" />
              </Form.Item>

              <Form.Item
                name="tcccd_hv"
                rules={[
                  { required: true, message: 'Thẻ CCCD is required' },
                  { type: 'number', message: 'Invalid TCCCD phải là số' },
                ]}
              >
                <Input placeholder="Enter your thẻ CCCD" />
              </Form.Item>

              <Form.Item name="bien_xe_hv" rules={[{ required: true, message: 'Biển số xe is required' }]}>
                <Input placeholder="Enter your biển số xe" />
              </Form.Item>

              <Form.Item name="diem_tich_luy" rules={[{ type: 'number', message: 'Invalid điểm tích luỹ' }]}>
                <Input placeholder="Enter your điểm tích luỹ" type="number" />
              </Form.Item>

              <Form.Item
                name="email_hv"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>

              <Form.Item className="it_end">
                <Button className="btn-primary1" type="primary" htmlType="submit">
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

export default MemberAdd;
