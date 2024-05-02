/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Select, DatePicker, Button, message } from 'antd';
import requestApi from '../../helpers/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import moment from 'moment/moment';
import './CardEdit.css';

const { Option } = Select;

const CardEdit = () => {
  const { id_card } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [staffs, setStaffs] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    fetchStaffs();
    fetchClassrooms();
    fetchCardData();
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

  const fetchClassrooms = async () => {
    try {
      const res = await requestApi('/classrooms', 'GET');
      if (res.data.data !== null && Array.isArray(res.data.data)) {
        setClassrooms(res.data.data);
      } else {
        console.error('Staff data is not an array:', res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch classrooms:', error);
    }
  };

  const fetchCardData = async () => {
    try {
      const res = await requestApi(`/cards/${id_card}`, 'GET');
      if (res.data) {
        form.setFieldsValue({
          classroom: res.data.classroom ? res.data.classroom.id_classroom : null,
          staff: res.data.staff ? res.data.staff.id_nv : null,
          status: res.data.status.toString(),
          ngay_start: moment(res.data.ngay_start),
          ngay_end: moment(res.data.ngay_end),
        });
      } else {
        console.error('No data returned for card:', id_card);
      }
    } catch (error) {
      console.error('Failed to fetch card data:', error);
    }
  };

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/cards/${id_card}`, 'PUT', data);
      console.log('card update => ', res);
      message.success('Cập nhật thẻ thành công!', 2);
      setTimeout(() => navigate('/card'), 1000);
    } catch (error) {
      console.error('Failed to update card:', error);
      message.error('Failed to update card. Please try again later.');
    }
    dispatch(actions.controlLoading(false));
  };

  return (
    <div className="bg-primary-card-edit">
      <div className="container-card-edit">
        <div className="card-header-card-edit">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Update Card
          </h3>
        </div>
        <div className="card-body-card-edit">
          <div className="label-edit-card-edit">
            <label>Lớp:</label>
            <label>Nhân viên:</label>
            <label>Trạng thái:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>

          <div className="input-edit-card-edit">
            <Form form={form} onFinish={handleSubmitFormUpdate} layout="vertical">
              <Form.Item name="classroom" rules={[{ required: true, message: 'Classroom is required' }]}>
                <Select placeholder="Select a classroom" style={{ width: '17rem' }}>
                  {classrooms.map((clr) => (
                    <Option key={clr.id_classroom} value={clr.id_classroom}>
                      {` ${clr.name_classroom}`}
                    </Option>
                  ))}
                </Select>
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

              <Form.Item name="status">
                <Select style={{ width: '17rem' }}>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item name="ngay_start">
                <DatePicker style={{ width: '17rem' }} format={dateFormat} />
              </Form.Item>

              <Form.Item name="ngay_end">
                <DatePicker style={{ width: '17rem' }} format={dateFormat} />
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

export default CardEdit;
