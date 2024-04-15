import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message, DatePicker } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';
import './ClassroomEdit.css';

const ClassroomEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [classroomData, setClassroomData] = useState({});
  const [staffs, setStaffs] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const fetchData = async () => {
        const [cardsRes, staffsRes, detailClassroomRes] = await Promise.all([
          requestApi(`/cards?classroom_id=${params.id_classroom}`, 'GET'),
          requestApi('/staffs', 'GET'),
          requestApi(`/classrooms/${params.id_classroom}`, 'GET'),
        ]);

        const cardsData = cardsRes.data.data;
        const staffsData = staffsRes.data.data;
        const classroomData = detailClassroomRes.data.data;
        if (classroomData && classroomData.card) {
          const cardId = classroomData.card.id_card;
          setClassroomData({ ...classroomData, cardId });
        } else {
          console.error('Card data is missing in classroom data:', classroomData);
        }
        setStaffs(staffsData);

        const totalCardsCount = cardsData.reduce((total, card) => {
          if (card.id_classroom === params.id_classroom) {
            return total + 1;
          }
          return total;
        }, 0);
        setTotalCards(totalCardsCount);

        dispatch(actions.controlLoading(false));
      };

      fetchData();
    } catch (error) {
      console.error('Error fetching classroom data:', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id_classroom]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/classrooms/${params.id_classroom}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành công!', 2);
      setTimeout(() => navigate('/classroom'), 1000);
    } catch (error) {
      console.error('Error updating classroom:', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary-clasroom-ed">
      <div className="container-clasroom-ed">
        <div className="card-header-clasroom-ed">
          <h3 className="text-henter-clasroom-ed" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Classroom
          </h3>
        </div>
        <div className="card-body-clasroom-ed">
          <div className="label-edit-clasroom-ed label-pg-edit-clasroom-ed">
            <label>Tên lớp:</label>
            <label>Nhân viên:</label>
            <label>Số lượng:</label>
            <label>Thời lượng:</label>
            <label>Ngày tập:</label>
            <label>Trạng thái:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>
          <div className="input-edit-clasroom-ed">
            <input
              {...register('name_classroom', { required: { value: true, message: 'Name is required' } })}
              placeholder="Enter your name"
            />
            {errors.name_classroom && <p>{errors.name_classroom.message}</p>}

            <select {...register('staffId')} defaultValue={classroomData.staffId}>
              {staffs.map((nv) => (
                <option key={nv.id_nv} value={nv.id_nv}>
                  {`${nv.id_nv}, ${nv.name_nv}`}
                </option>
              ))}
            </select>

            <input {...register('so_luong_classroom')} placeholder={` ${totalCards}`} disabled />

            <select
              {...register('thoi_luong_classroom')}
              className="form-control"
              defaultValue={classroomData.thoi_luong_classroom}
            >
              <option value="1">Ca 1</option>
              <option value="2">Ca 1</option>
              <option value="3">Ca 3</option>
              <option value="4">Ca 4</option>
              <option value="5">Ca 5</option>
            </select>

            <select
              mode="multiple"
              {...register('day_classroom')}
              className="form-control"
              defaultValue={classroomData.day_classroom}
            >
              <option value="1">Chủ nhật</option>
              <option value="2">Thứ 2</option>
              <option value="3">Thứ 3</option>
              <option value="4">Thứ 4</option>
              <option value="5">Thứ 5</option>
              <option value="6">Thứ 6</option>
              <option value="7">Thứ 7</option>
            </select>

            <select {...register('status')} className="form-control" defaultValue={classroomData.status}>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <DatePicker
              {...register('ngay_start', { required: 'Date is required' })}
              defaultValue={classroomData.ngay_start}
              style={{ width: '18rem' }}
              allowClear={false}
              inputReadOnly={false}
              placeholder="Select date"
            />

            <DatePicker
              {...register('ngay_end', { required: 'Date is required' })}
              defaultValue={classroomData.ngay_end}
              style={{ width: '18rem' }}
              allowClear={false}
              inputReadOnly={false}
              placeholder="Select date"
            />

            <button className="btn-primary-clasroom-ed" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomEdit;
