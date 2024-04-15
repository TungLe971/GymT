import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import requestApi from '../../../helpers/api';
import { message } from 'antd';

const HealthEdit = () => {
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
    const fetchMemberData = async () => {
      dispatch(actions.controlLoading(true));
      try {
        const res = await requestApi(`/members/${params.id_hv}`, 'GET');
        const fields = ['id_hv', 'name_hv', 'chieu_cao', 'can_nang', 'phan_tram_mo', 'diem_tich_luy'];
        fields.forEach((field) => setValue(field, res.data[field]));
        dispatch(actions.controlLoading(false));
      } catch (error) {
        console.log('error =>', error);
        dispatch(actions.controlLoading(false));
      }
    };
    fetchMemberData();
  }, [dispatch, params.id_hv, setValue]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/members/${params.id_hv}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành viên thành công!', 2);
      setTimeout(() => navigate('/health'), 1000);
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
            Update Health
          </h3>
        </div>
        <div className="card-body2" style={{ width: '33rem' }}>
          <div className="label-edit2">
            <label style={{ width: '12rem', marginTop: -2 }}>ID hội viên:</label>
            <label style={{ width: '12rem', marginTop: -2 }}>Name:</label>
            <label style={{ width: '12rem', marginTop: -2 }}>Chiều cao:</label>
            <label style={{ width: '12rem', marginTop: -2 }}>Cân nặng:</label>
            <label style={{ width: '12rem', marginTop: -2 }}>Phần trăm mỡ:</label>
            <label style={{ width: '12rem', marginTop: -2 }}>Tích luỹ:</label>
          </div>
          <div className="input-edit2">
            <input {...register('id_hv')} disabled />
            {errors.id_hv && <p>{errors.id_hv.message}</p>}

            <input
              {...register('name_hv', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_hv && <p>{errors.name_hv.message}</p>}

            <input
              {...register('chieu_cao', { required: { value: true, message: 'Tall is required' } })}
              type="number"
            />
            {errors.chieu_cao && <p>{errors.chieu_cao.message}</p>}

            <input
              {...register('can_nang', { required: { value: true, message: 'Weight is required' } })}
              type="number"
            />
            {errors.can_nang && <p>{errors.can_nang.message}</p>}

            <input
              {...register('phan_tram_mo', { required: { value: true, message: 'Phần trăm mỡ is required' } })}
              type="text"
            />
            {errors.phan_tram_mo && <p>{errors.phan_tram_mo.message}</p>}

            <input
              {...register('diem_tich_luy', { required: { value: true, message: 'Position is required' } })}
              type="number"
            />
            {errors.diem_tich_luy && <p>{errors.diem_tich_luy.message}</p>}

            <button className="btn-primary2" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthEdit;
