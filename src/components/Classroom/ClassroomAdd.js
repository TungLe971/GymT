import React, { useState, useEffect } from 'react';
import './ClassroomAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, DatePicker, Button, Select, Input } from 'antd';

const { Option } = Select;

const ClassroomAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [defaultStatus, setDefaultStatus] = useState('1');
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

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

  const handleSubmitFormAdd = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/classrooms', 'POST', data);
      console.log('classroom => ', res);
      message.success('Thêm thành công!', 2);
      setTimeout(() => navigate('/classroom'), 1000);
    } catch (error) {
      console.error('Failed to add classroom:', error);
      message.error('Failed to add classroom. Please try again later.');
    }
    dispatch(actions.controlLoading(false));
  };

  return (
    <div className="bg-primary-clasroom">
      <div className="container-clasroom">
        <div className="card-header-clasroom">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Create Classroom
          </h3>
        </div>
        <div className="card-body-clasroom">
          <div className="label-add-clasroom">
            <label>Tên lớp:</label>
            <label>Nhân viên:</label>
            <label>Thời lượng:</label>
            <label>Ngày tập:</label>
            <label>Trạng thái:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>

          <div className="input-add-clasroom">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="name_classroom" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your Name" />
              </Form.Item>

              <Form.Item name="staff">
                <Select placeholder="Select a staff" showSearch optionFilterProp="children">
                  {staffs.map((nv) => (
                    <Option key={nv.id_nv} value={nv.id_nv}>
                      {`${nv.id_nv}, ${nv.name_nv}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="thoi_luong_classroom" rules={[{ required: true, message: 'Ca is required' }]}>
                <Select onChange={(value) => setDefaultStatus(value)}>
                  <Option value="1">Ca 1</Option>
                  <Option value="2">Ca 2</Option>
                  <Option value="3">Ca 3</Option>
                  <Option value="4">Ca 4</Option>
                  <Option value="5">Ca 5</Option>
                </Select>
              </Form.Item>

              <Form.Item name="day_classroom" rules={[{ required: true, message: 'Day is required' }]}>
                <Select mode="multiple" onChange={(value) => setDefaultStatus(value)}>
                  <Option value="2">Thứ 2</Option>
                  <Option value="3">Thứ 3</Option>
                  <Option value="4">Thứ 4</Option>
                  <Option value="5">Thứ 5</Option>
                  <Option value="6">Thứ 6</Option>
                  <Option value="7">Thứ 7</Option>
                  <Option value="1">Chủ Nhật</Option>
                </Select>
              </Form.Item>

              <Form.Item name="status" initialValue={defaultStatus}>
                <Select onChange={(value) => setDefaultStatus(value)}>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item name="ngay_start" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                />
              </Form.Item>

              <Form.Item name="ngay_end" rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                />
              </Form.Item>

              <Form.Item className="it_end">
                <Button className="btn-primary-clasroom" type="primary" htmlType="submit">
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

export default ClassroomAdd;
