import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message, DatePicker } from 'antd';
import requestApi from '../../helpers/api';
import * as actions from '../../redux/actions';
import './CardEdit.css';

const CardEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [cardData, setCardData] = useState({});
  const [members, setMembers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [packagess, setPackagess] = useState([]);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const fetchData = async () => {
        const [membersRes, staffsRes, packagessRes, detailCardRes] = await Promise.all([
          requestApi('/members', 'GET'),
          requestApi('/staffs', 'GET'),
          requestApi('/packagess', 'GET'),
          requestApi(`/cards/${params.id_card}`, 'GET'),
        ]);

        setMembers(membersRes.data.data);
        setStaffs(staffsRes.data.data);
        setPackagess(packagessRes.data.data);
        setCardData(detailCardRes.data.data);
        dispatch(actions.controlLoading(false));
      };

      fetchData();
    } catch (error) {
      console.error('Error fetching card data:', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id_card, setValue]);

  const handleSubmitFormUpdate = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/cards/${params.id_card}`, 'PUT', data);
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành công!', 2);
      setTimeout(() => navigate('/card'), 1000);
    } catch (error) {
      console.error('Error updating card:', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary-card-ed">
      <div className="container-card-ed">
        <div className="card-header-card-ed">
          <h3 className="text-henter-card-ed" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Card
          </h3>
        </div>
        <div className="card-body-card-ed">
          <div className="label-edit-card-ed label-pg-edit-card-ed">
            <label>Hội viên:</label>
            <label>Nhân viên:</label>
            <label>Gói:</label>
            <label>Trạng thái:</label>
            <label>Ngày bắt đầu:</label>
            <label>Ngày kết thúc:</label>
          </div>
          <div className="input-edit-card-ed">
            <select {...register('memberId')} defaultValue={cardData.memberId}>
              {members.map((hv) => (
                <option key={hv.id_hv} value={hv.id_hv}>
                  {`${hv.id_hv}, ${hv.name_hv}`}
                </option>
              ))}
            </select>

            <select {...register('staffId')} defaultValue={cardData.staffId}>
              {staffs.map((nv) => (
                <option key={nv.id_nv} value={nv.id_nv}>
                  {`${nv.id_nv}, ${nv.name_nv}`}
                </option>
              ))}
            </select>

            <select {...register('packageId')} defaultValue={cardData.packageId}>
              {packagess.map((pkg) => (
                <option key={pkg.id_packages} value={pkg.id_packages}>
                  {`${pkg.id_packages}, ${pkg.name_packages}`}
                </option>
              ))}
            </select>

            <select {...register('status')} className="form-control" defaultValue={cardData.status}>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <DatePicker
              {...register('ngay_start', { required: 'Date is required' })}
              defaultValue={cardData.ngay_start}
              style={{ width: '17rem' }}
              allowClear={false}
              inputReadOnly={false}
              placeholder="Select date"
            />

            <DatePicker
              {...register('ngay_end', { required: 'Date is required' })}
              defaultValue={cardData.ngay_end}
              style={{ width: '17rem' }}
              allowClear={false}
              inputReadOnly={false}
              placeholder="Select date"
            />

            <button className="btn-primary-card-ed" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
