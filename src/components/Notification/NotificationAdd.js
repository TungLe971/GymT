import React, { useState } from 'react';
import './NotificationAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, Input, Button, Select } from 'antd';

const NotificationAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [defaultStatus, setDefaultStatus] = useState('1');

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/notifications', 'Post', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Thêm thông báo thành công!', 2);
      setTimeout(() => navigate('/notification'), 1000);
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
            Create Notification
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add">
            <label>Tiêu đề:</label>
            <label>Trạng thái:</label>
            <label>Nội dung:</label>
          </div>
          <div className="input-add">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="title_n" rules={[{ required: true, message: 'Title is required' }]}>
                <Input placeholder="Enter your title" />
              </Form.Item>

              <Form.Item name="status_n" initialValue={defaultStatus}>
                <Select onChange={(value) => setDefaultStatus(value)}>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item name="noi_dung_n">
                <Input.TextArea
                  className="input_n"
                  placeholder="Enter your nội dung"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
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

export default NotificationAdd;
