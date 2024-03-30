import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message } from 'antd';

const MemberEdit = () => {
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
        const fields = [
          'name_hv',
          'ngay_sinh_hv',
          'gioi_tinh_hv',
          'tuoi_hv',
          'sdt_hv',
          'tcccd_hv',
          'bien_xe_hv',
          'diem_tich_luy',
          'email_hv',
        ];
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
      setTimeout(() => navigate('/member'), 1000);
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
            Update Member
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
            <label>Tích luỹ:</label>
            <label>Email:</label>
          </div>
          <div className="input-edit2">
            <input
              {...register('name_hv', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_hv && <p>{errors.name_hv.message}</p>}

            <input
              {...register('ngay_sinh_hv', { required: { value: true, message: 'Born is required' } })}
              type="date"
            />
            {errors.ngay_sinh_hv && <p>{errors.ngay_sinh_hv.message}</p>}

            <select {...register('gioi_tinh_hv', { required: { value: true, message: 'Sex is required' } })}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gioi_tinh_hv && <p>{errors.gioi_tinh_hv.message}</p>}

            <input
              {...register('tuoi_hv', { required: { value: true, message: 'Year old is required' } })}
              type="number"
            />
            {errors.tuoi_hv && <p>{errors.tuoi_hv.message}</p>}

            <input
              {...register('sdt_hv', { required: { value: true, message: 'Phone number is required' } })}
              type="tel"
            />
            {errors.sdt_hv && <p>{errors.sdt_hv.message}</p>}

            <input {...register('tcccd_hv', { required: { value: true, message: 'CCCD is required' } })} type="text" />
            {errors.tcccd_hv && <p>{errors.tcccd_hv.message}</p>}

            <input
              {...register('bien_xe_hv', { required: { value: true, message: 'License plates is required' } })}
              type="text"
            />
            {errors.bien_xe_hv && <p>{errors.bien_xe_hv.message}</p>}

            <input
              {...register('diem_tich_luy', { required: { value: true, message: 'Position is required' } })}
              type="number"
            />
            {errors.diem_tich_luy && <p>{errors.diem_tich_luy.message}</p>}

            <input
              {...register('email_hv', { required: { value: true, message: 'Email is required' } })}
              type="email"
            />
            {errors.email_hv && <p>{errors.email_hv.message}</p>}

            <button className="btn-primary2" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit;
