import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message } from 'antd';
import './StaffEdit.css';

const StaffEdit = () => {
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
    const fetchStaffData = async () => {
      dispatch(actions.controlLoading(true));
      try {
        const res = await requestApi(`/staffs/${params.id_nv}`, 'GET');
        const fields = [
          'name_nv',
          'ngay_sinh_nv',
          'gioi_tinh_nv',
          'tuoi_nv',
          'sdt_nv',
          'tcccd_nv',
          'bien_xe_nv',
          'chuc_vu',
          'email_nv',
          'dia_chi_nv',
        ];
        fields.forEach((field) => setValue(field, res.data[field]));
        dispatch(actions.controlLoading(false));
      } catch (error) {
        console.log('error =>', error);
        dispatch(actions.controlLoading(false));
      }
    };
    fetchStaffData();
  }, [dispatch, params.id_nv, setValue]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/staffs/${params.id_nv}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành viên thành công!', 2);
      setTimeout(() => navigate('/staff'), 1000);
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
            Update Staff
          </h3>
        </div>
        <div className="card-body2">
          <div className="label-edit2">
            <label>Name:</label>
            <label>Ngày sinh:</label>
            <label>Giới tính:</label>
            <label>Tuổi:</label>
            <label>SĐT:</label>
            <label>TCCCD:</label>
            <label>Biển xe:</label>
            <label>Chức vụ:</label>
            <label>Email:</label>
            <label>Địa chỉ:</label>
          </div>
          <div className="input-edit2">
            <input
              {...register('name_nv', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_nv && <p>{errors.name_nv.message}</p>}

            <input
              {...register('ngay_sinh_nv', { required: { value: true, message: 'Born is required' } })}
              type="date"
            />
            {errors.ngay_sinh_nv && <p>{errors.ngay_sinh_nv.message}</p>}

            <select {...register('gioi_tinh_nv', { required: { value: true, message: 'Sex is required' } })}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gioi_tinh_nv && <p>{errors.gioi_tinh_nv.message}</p>}

            <input
              {...register('tuoi_nv', { required: { value: true, message: 'Year old is required' } })}
              type="number"
            />
            {errors.tuoi_nv && <p>{errors.tuoi_nv.message}</p>}

            <input
              {...register('sdt_nv', { required: { value: true, message: 'Phone number is required' } })}
              type="tel"
            />
            {errors.sdt_nv && <p>{errors.sdt_nv.message}</p>}

            <input {...register('tcccd_nv', { required: { value: true, message: 'CCCD is required' } })} type="text" />
            {errors.tcccd_nv && <p>{errors.tcccd_nv.message}</p>}

            <input
              {...register('bien_xe_nv', { required: { value: true, message: 'License plates is required' } })}
              type="text"
            />
            {errors.bien_xe_nv && <p>{errors.bien_xe_nv.message}</p>}

            <select {...register('chuc_vu', { required: { value: true, message: 'Position is required' } })}>
              <option value="Quản lý">Quản lý</option>
              <option value="Lễ tân">Lễ tân</option>
              <option value="PT">PT</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.chuc_vu && <p>{errors.chuc_vu.message}</p>}

            <input
              {...register('email_nv', { required: { value: true, message: 'Email is required' } })}
              type="email"
            />
            {errors.email_nv && <p>{errors.email_nv.message}</p>}

            <input
              {...register('dia_chi_nv', { required: { value: true, message: 'Address is required' } })}
              type="text"
            />
            {errors.dia_chi_nv && <p>{errors.dia_chi_nv.message}</p>}
            <button className="btn-primary2" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffEdit;
