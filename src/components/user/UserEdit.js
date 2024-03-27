import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { message } from 'antd';
import './UserEdit.css';

const UserEdit = () => {
  const params = useParams();
  console.log('id user => ', params.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailUser = async () => {
        const res = await requestApi('/users/' + params.id, 'GET');
        console.log('res =>', res);
        dispatch(actions.controlLoading(false));
        const fields = ['first_name', 'last_name', 'status'];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailUser();
    } catch (error) {
      console.log('error =>', error);
      dispatch(actions.controlLoading(false));
    }
  });

  const handleSubmitFormUpdate = async (data) => {
    console.log('data => ', data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/users/' + params.id, 'PUT', data);
      console.log('res=> ', res);
      dispatch(actions.controlLoading(false));
      message.success('Sửa thành công!', 2);
      setTimeout(() => navigate('/user'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  };
  return (
    <div id="layoutAuthentication" className="bg-primary">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4" style={{ color: 'white', fontSize: '2.5rem' }}>
                Update Account
              </h3>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="form-floating mb-3 mb-md-0">
                    <label for="inputFirstName">First name:</label>
                    <input
                      {...register('first_name', { required: 'First name is required' })}
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                    />
                    {errors.first_name && <p style={{ marginTop: 2, color: 'red' }}>{errors.first_name.message}</p>}
                  </div>

                  <div className="form-floating">
                    <label for="inputLastName">Last name:</label>
                    <input
                      {...register('last_name', { required: 'Last name is required' })}
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                    />
                    {errors.last_name && <p style={{ marginTop: 2, color: 'red' }}>{errors.last_name.message}</p>}
                  </div>
                </div>
                <div className="row mb-3">
                  {/* <div className="form-floating mb-3 mb-md-0">
                    <label for="inputPassword">Password:</label>
                    <input
                      {...register('password', { required: 'Password name is required' })}
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Create a password"
                    />
                    {errors.password && <p style={{ marginTop: 2, color: 'red' }}>{errors.password.message}</p>}
                  </div> */}
                  <div className="form-floating mb-3 mb-md-0">
                    <label for="inputStatus">Status:</label>
                    <select {...register('status')} className="form-control" id="inputStatus">
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* <div className="form-floating mb-3 mb-md-0">
                    <label for="inputPasswordConfirm">Confirm Password:</label>
                    <input
                      className="form-control"
                      id="inputPasswordConfirm"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </div> */}

                <div className="mt-4 mb-0">
                  <button className="btn btn-primary btn-block" onClick={handleSubmit(handleSubmitFormUpdate)}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default UserEdit;
