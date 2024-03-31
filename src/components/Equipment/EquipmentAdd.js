import React from 'react';
import './EquipmentAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const EquipmentAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/equipments', 'Post', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Thêm gói thành công!', 2);
      setTimeout(() => navigate('/equipment'), 1000);
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
            Create Equipment
          </h3>
        </div>
        <div className="card-body1">
          <div className="label-add">
            <label>Name:</label>
            <label>Số Lượng:</label>
            <label>Loại:</label>
            <label>Giá:</label>
            <label>Trạng thái:</label>
            <label>Ghi chú:</label>
          </div>
          <div className="input-add">
            <Form form={form} onFinish={handleSubmitFormAdd} layout="vertical">
              <Form.Item name="name_equipment" rules={[{ required: true, message: 'Name is required' }]}>
                <Input placeholder="Enter your Name" />
              </Form.Item>

              <Form.Item name="so_luong_equipment" rules={[{ required: true, message: 'Quantity is required' }]}>
                <Input placeholder="Enter your quantity" type="number" />
              </Form.Item>

              <Form.Item name="loai_equipment" rules={[{ required: true, message: 'Type is required' }]}>
                <Input placeholder="Enter your Type" type="text" />
              </Form.Item>

              <Form.Item name="gia_equipment" rules={[{ required: true, message: 'Price is required' }]}>
                <Input placeholder="Enter your Price" type="number" />
              </Form.Item>

              <Form.Item name="status_equipment" rules={[{ required: true, message: 'Status is required' }]}>
                <Select style={{ width: '17rem' }} placeholder="Select Status">
                  <Option value="Tốt">Tốt</Option>
                  <Option value="Cũ">Cũ</Option>
                  <Option value="Hỏng">Hỏng</Option>
                </Select>
              </Form.Item>

              <Form.Item name="note_equipment">
                <Input.TextArea
                  className="input_note"
                  placeholder="Enter your Note"
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

export default EquipmentAdd;
