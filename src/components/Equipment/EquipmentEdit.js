import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message } from 'antd';
import './EquipmentEdit.css';

const EquipmentEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const fetchEquipmentData = async () => {
      dispatch(actions.controlLoading(true));
      try {
        const res = await requestApi(`/equipments/${params.id_equipment}`, 'GET');
        const fields = [
          'name_equipment',
          'so_luong_equipment',
          'loai_equipment',
          'gia_equipment',
          'status_equipment',
          'note_equipment',
        ];
        fields.forEach((field) => setValue(field, res.data[field]));
        dispatch(actions.controlLoading(false));
      } catch (error) {
        console.log('error =>', error);
        dispatch(actions.controlLoading(false));
      }
    };
    fetchEquipmentData();
  }, [dispatch, params.id_equipment, setValue]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/equipments/${params.id_equipment}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành viên thành công!', 2);
      setTimeout(() => navigate('/equipment'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary2">
      <div className="container2">
        <div className="card-header2">
          <h3 className="text-henter2" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Equipment
          </h3>
        </div>
        <div className="card-body2">
          <div className="label-edit2">
            <label>Name:</label>
            <label>Số Lượng:</label>
            <label>Loại:</label>
            <label>Giá:</label>
            <label>Trạng thái:</label>
            <label>Ghi chú:</label>
          </div>
          <div className="input-edit2">
            <input
              {...register('name_equipment', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_equipment && <p>{errors.name_equipment.message}</p>}

            <input
              {...register('so_luong_equipment', { required: { value: true, message: 'Quantity is required' } })}
              type="num"
            />
            {errors.so_luong_equipment && <p>{errors.so_luong_equipment.message}</p>}

            <input
              {...register('loai_equipment', { required: { value: true, message: 'Type is required' } })}
              type="text"
            />
            {errors.loai_equipment && <p>{errors.loai_equipment.message}</p>}

            <input
              {...register('gia_equipment', { required: { value: true, message: 'Price is required' } })}
              type="num"
            />
            {errors.gia_equipment && <p>{errors.gia_equipment.message}</p>}

            <select {...register('status_equipment', { required: { value: true, message: 'Status is required' } })}>
              <option value="Tốt">Tốt</option>
              <option value="Cũ">Cũ</option>
              <option value="Hỏng">Hỏng</option>
            </select>
            {errors.status_equipment && <p>{errors.status_equipment.message}</p>}

            <textarea
              {...register('note_equipment')}
              placeholder="Enter your note"
              style={{ minHeight: '8em', maxHeight: '15rem', width: '295px' }}
            />

            <button className="btn-primary2" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentEdit;
