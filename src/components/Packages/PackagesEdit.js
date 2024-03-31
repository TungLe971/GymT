import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';

const PackagesEdit = () => {
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

  const handleSubmitFormUpdate = async (data) => {
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
    <div className="bg-primary2">
      <div className="container2">
        <div className="card-header2">
          <h3 className="text-henter2" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Packages
          </h3>
        </div>
        <div className="card-body2">
          <div className="label-edit2 label-pg-edit2">
            <label>Name:</label>
            <label>Giá:</label>
            <label>Ghi chú:</label>
          </div>
          <div className="input-edit2">
            <input
              {...register('name_packages', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_packages && <p>{errors.name_packages.message}</p>}

            <input
              {...register('gia_packages', { required: { value: true, message: 'Price is required' } })}
              type="num"
            />
            {errors.gia_packages && <p>{errors.gia_packages.message}</p>}

            <textarea
              {...register('note_packages')}
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

export default PackagesEdit;
