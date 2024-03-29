import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message, Form, Input, Button } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';

const PackagesEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setValue } = useForm();

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailPackages = async () => {
        const res = await requestApi(`/packagess/${params.id_packages}`, 'GET');
        dispatch(actions.controlLoading(false));
        const fields = ['name_packages', 'gia_packages', 'note_packages'];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailPackages();
    } catch (error) {
      console.log('error =>', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id_packages, setValue]);

  const onSubmit = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/packagess/${params.id_packages}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật gói thành công!', 2);
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
          <h3 className="text-henter" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Update Packages
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add">
            <label>Name:</label>
            <label>Giá:</label>
            <label>Ghi chú:</label>
          </div>
          <div className="input-add">
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
              <Form.Item name="name_packages" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item name="gia_packages" rules={[{ required: true, message: 'Giá is required' }]}>
                <Input placeholder="Enter your age" type="number" />
              </Form.Item>

              <Form.Item name="note_packages" rules={[{ required: true, message: 'Note is required' }]}>
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

export default PackagesEdit;
