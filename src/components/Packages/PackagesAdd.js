import React from 'react';
import './PackagesAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, Input, Button } from 'antd';

const PackagesAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/packagess', 'Post', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Thêm gói thành công!', 2);
      setTimeout(() => navigate('/packages'), 1000);
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
            Create Packages
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add">
            <label>Name:</label>
            <label>Giá:</label>
            <label>Note:</label>
          </div>
          <div className="input-add">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="name_packages" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item name="gia_packages" rules={[{ required: true, message: 'Giá is required' }]}>
                <Input placeholder="Enter your giá" type="number" />
              </Form.Item>

              <Form.Item name="note_packages">
                <Input.TextArea
                  className="input_note"
                  placeholder="Enter your note"
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

export default PackagesAdd;
