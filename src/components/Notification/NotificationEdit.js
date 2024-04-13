import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';

const NotificationEdit = () => {
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
      const getDetailNotification = async () => {
        const res = await requestApi(`/notifications/${params.id_n}`, 'GET');
        dispatch(actions.controlLoading(false));
        const fields = ['title_n', 'status_n', 'noi_dung_n'];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailNotification();
    } catch (error) {
      console.log('error =>', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id_n, setValue]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/notifications/${params.id_n}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thông báo thành công!', 2);
      setTimeout(() => navigate('/notification'), 1000);
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
            Update Notification
          </h3>
        </div>
        <div className="card-body2">
          <div className="label-edit2 label-pg-edit2">
            <label>Tiêu đề:</label>
            <label>Trạng thái:</label>
            <label>Nội dung:</label>
          </div>
          <div className="input-edit2">
            <input {...register('title_n', { required: { value: true, message: 'Title is required' } })} />
            {errors.title_n && <p>{errors.title_n.message}</p>}

            <select {...register('status_n')} className="form-control">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <textarea
              {...register('noi_dung_n')}
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

export default NotificationEdit;
