/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Select, DatePicker, Button, message, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import moment from 'moment/moment';
import './ClassroomEdit.css';

const { Option } = Select;

const ClassroomEdit = () => {
  const { id_classroom } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [staffs, setStaffs] = useState([]);
  const [classroomData, setClassroomData] = useState(null);

  useEffect(() => {
    fetchStaffs();
    fetchClassroomData();
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

  const fetchClassroomData = async () => {
    try {
      const res = await requestApi(`/classrooms/${id_classroom}`, 'GET');
      if (res.data) {
        setClassroomData(res.data);
        form.setFieldsValue({
          name_classroom: res.data.name_classroom,
          thoi_luong_classroom: res.data.thoi_luong_classroom.toString(),
          so_luong_classroom: res.data.so_luong_classroom,
          status: res.data.status.toString(),
          staff: res.data.staff ? res.data.staff.id_nv : null,
          day_classroom: res.data.day_classroom,
          ngay_start: moment(res.data.ngay_start),
          ngay_end: moment(res.data.ngay_end),
        });
      } else {
        console.error('No data returned for classroom:', id_classroom);
      }
    } catch (error) {
      console.error('Failed to fetch classroom data:', error);
    }
  };

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/classrooms/${id_classroom}`, 'PUT', data);
      console.log('classroom update => ', res);
      message.success('Cập nhật lớp học thành công!', 2);
      setTimeout(() => navigate('/classroom'), 1000);
    } catch (error) {
      console.error('Failed to update classroom:', error);
      message.error('Failed to update classroom. Please try again later.');
    }
    dispatch(actions.controlLoading(false));
  };

  return (
    <div className="bg-primary-classroom-edit">
      <div className="container-classroom-edit">
        <div className="card-header-classroom-edit">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Update Classroom
          </h3>
        </div>
        <div className="card-body-classroom-edit">
          <div className="label-edit-classroom-edit">
            <label>Tên lớp:</label>
            <label>Nhân viên:</label>
            <label>Số lượng:</label>
            <label>Thời lượng:</label>
            <label>Ngày tập:</label>
            <label>Trạng thái:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>

          <div className="input-edit-classroom-edit">
            <Form form={form} onFinish={handleSubmitFormUpdate} layout="vertical">
              <Form.Item name="name_classroom" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter classroom name" />
              </Form.Item>

              <Form.Item name="staff" rules={[{ required: true, message: 'Staff is required' }]}>
                <Select placeholder="Select a staff" style={{ width: '17rem' }}>
                  {staffs.map((nv) => (
                    <Option key={nv.id_nv} value={nv.id_nv}>
                      {`${nv.id_nv}, ${nv.name_nv}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="so_luong_classroom">
                <Input placeholder="Số lượng card" />
              </Form.Item>

              <Form.Item name="thoi_luong_classroom" rules={[{ required: true, message: 'Ca is required' }]}>
                <Select style={{ width: '17rem' }}>
                  <Option value="1">Ca 1</Option>
                  <Option value="2">Ca 2</Option>
                  <Option value="3">Ca 3</Option>
                  <Option value="4">Ca 4</Option>
                  <Option value="5">Ca 5</Option>
                </Select>
              </Form.Item>

              <Form.Item name="day_classroom" rules={[{ required: true, message: 'Day is required' }]}>
                <Select mode="multiple" style={{ width: '17rem' }}>
                  <Option value="2">Thứ 2</Option>
                  <Option value="3">Thứ 3</Option>
                  <Option value="4">Thứ 4</Option>
                  <Option value="5">Thứ 5</Option>
                  <Option value="6">Thứ 6</Option>
                  <Option value="7">Thứ 7</Option>
                  <Option value="1">Chủ Nhật</Option>
                </Select>
              </Form.Item>

              <Form.Item name="status">
                <Select style={{ width: '17rem' }}>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item name="ngay_start" rules={[{ required: true, message: 'Start date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select start date"
                />
              </Form.Item>

              <Form.Item name="ngay_end" rules={[{ required: true, message: 'End date is required' }]}>
                <DatePicker
                  style={{ width: '17rem' }}
                  allowClear={false}
                  inputReadOnly={false}
                  placeholder="Select end date"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
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

export default ClassroomEdit;
