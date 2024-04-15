import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message } from 'antd';
import './FoodEdit.css';

const FoodEdit = () => {
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
    const fetchFoodData = async () => {
      dispatch(actions.controlLoading(true));
      try {
        const res = await requestApi(`/foods/${params.id_food}`, 'GET');
        const fields = [
          'name_food',
          'so_luong_nhap_food',
          'so_luong_con_food',
          'loai_food',
          'gia_nhap_food',
          'gia_ban_food',
          'total_money_food',
          'note_food',
        ];
        fields.forEach((field) => setValue(field, res.data[field]));
        dispatch(actions.controlLoading(false));
      } catch (error) {
        console.log('error =>', error);
        dispatch(actions.controlLoading(false));
      }
    };
    fetchFoodData();
  }, [dispatch, params.id_food, setValue]);

  async function handleSubmitFormUpdate(data) {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/foods/${params.id_food}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành viên thành công!', 2);
      setTimeout(() => navigate('/food'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  }

  return (
    <div className="bg-primary-food-ed">
      <div className="container-food-ed">
        <div className="card-header-food-ed">
          <h3 className="text-henter-food-ed" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Food
          </h3>
        </div>
        <div className="card-body-food-ed">
          <div className="label-edit-food-ed">
            <label>Name:</label>
            <label>Lượng nhập:</label>
            <label>Lượng còn:</label>
            <label>Loại:</label>
            <label>Giá nhập:</label>
            <label>Giá Bán:</label>
            <label>Thành tiền:</label>
            <label>Ghi chú:</label>
          </div>
          <div className="input-edit-food-ed">
            <input
              {...register('name_food', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_food && <p>{errors.name_food.message}</p>}

            <input
              {...register('so_luong_nhap_food', {
                required: { value: true, message: 'Quantity imported is required' },
              })}
              type="number"
            />
            {errors.so_luong_nhap_food && <p>{errors.so_luong_nhap_food.message}</p>}

            <input
              {...register('so_luong_con_food', { required: { value: true, message: 'Quantity is required' } })}
              type="number"
            />
            {errors.so_luong_con_food && <p>{errors.so_luong_con_food.message}</p>}

            <select {...register('loai_food', { required: { value: true, message: 'Type is required' } })}>
              <option value="Nước">Nước</option>
              <option value="Thực phẩm">Thực phẩm</option>
            </select>
            {errors.loai_food && <p>{errors.loai_food.message}</p>}

            <input
              {...register('gia_nhap_food', { required: { value: true, message: 'Price imported is required' } })}
              type="number"
            />
            {errors.gia_nhap_food && <p>{errors.gia_nhap_food.message}</p>}

            <input
              {...register('gia_ban_food', { required: { value: true, message: 'Price is required' } })}
              type="number"
            />
            {errors.gia_ban_food && <p>{errors.gia_ban_food.message}</p>}

            <input {...register('total_money_food')} disabled />

            <textarea
              {...register('note_food')}
              placeholder="Enter your note"
              style={{ minHeight: '8em', maxHeight: '15rem', width: '295px' }}
            />

            <button className="btn-primary-food-ed" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodEdit;
