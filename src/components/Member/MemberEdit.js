import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message, Form, Input, Select, Button, DatePicker } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';

const { Option } = Select;

const MemberEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setValue } = useForm();

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailMember = async () => {
        const res = await requestApi(`/members/${params.id_hv}`, 'GET');
        dispatch(actions.controlLoading(false));
        const fields = [
          'name_hv',
          'ngay_sinh_hv',
          'gioi_tinh_hv',
          'tuoi_hv',
          'sdt_hv',
          'tcccd_hv',
          'bien_xe_hv',
          'diem_tich_luy',
          'email_hv',
        ];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailMember();
    } catch (error) {
      console.log('error =>', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id_hv, setValue]);

  const onSubmit = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/members/${params.id_hv}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành viên thành công!', 2);
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
          <h3 className="text-henter" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Update Member
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
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
              <Form.Item name="name_hv" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item name="ngay_sinh_hv" rules={[{ required: true, message: 'Date of birth is required' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="Select date" />
              </Form.Item>

              <Form.Item name="gioi_tinh_hv" rules={[{ required: true, message: 'Gender is required' }]}>
                <Select placeholder="Select gender">
                  <Option value="1">Nam</Option>
                  <Option value="2">Nữ</Option>
                  <Option value="3">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item name="tuoi_hv" rules={[{ required: true, message: 'Age is required' }]}>
                <Input placeholder="Enter your age" type="number" />
              </Form.Item>

              <Form.Item name="sdt_hv" rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item name="tcccd_hv" rules={[{ required: true, message: 'ID card is required' }]}>
                <Input placeholder="Enter your ID card" />
              </Form.Item>

              <Form.Item name="bien_xe_hv" rules={[{ required: true, message: 'License plate is required' }]}>
                <Input placeholder="Enter your license plate" />
              </Form.Item>

              <Form.Item name="diem_tich_luy">
                <Input placeholder="Enter your accumulated points" type="number" />
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

export default MemberEdit;
