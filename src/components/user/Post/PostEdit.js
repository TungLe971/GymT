import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import requestApi from '../../../helpers/api';
import * as actions from '../../../redux/actions';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostEdit.css';

const PostEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm();
  // const [thumbnail, setThumbnail] = useState('');
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState({});

  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPostData({ ...postData, thumbnail: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const renderData = async () => {
        const res = await requestApi(`/categories`, 'GET');
        console.log('res => ', res);
        setCategories(res.data);

        const detailPost = await requestApi(`/posts/${params.id}`, 'GET');
        console.log('detailPost => ', detailPost);

        const fields = ['title', 'summary', 'description', 'thumbnail', 'category', 'status'];
        fields.forEach((field) => {
          if (field === 'category') {
            setValue(field, detailPost.data[field].id);
          } else {
            setValue(field, detailPost.data[field]);
          }
        });
        setPostData({ ...detailPost.data, thumbnail: process.env.REACT_APP_API_URL + '/' + detailPost.data.thumbnail });
        dispatch(actions.controlLoading(false));
      };

      renderData();
    } catch (error) {
      console.log('error =>', error);
      dispatch(actions.controlLoading(false));
    }
  }, [dispatch, params.id, setValue]);

  const sanitizeHTML = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleSubmitFormUpdate = async (data) => {
    console.log('data form = > ', data);
    let formData = new FormData();
    for (let key in data) {
      if (key === 'thumbnail') {
        if (data.thumbnail[0] instanceof File) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/posts/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
      console.log('res =>', res);
      dispatch(actions.controlLoading(false));
      message.success('Cập nhật thành công!', 2);
      setTimeout(() => navigate('/post'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div className="bg-primary-post-ed">
      <div className="container-post-ed">
        <div className="card-header-post-ed">
          <h3 className="text-henter-post-ed" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-4px' }}>
            Update Post
          </h3>
        </div>
        <div className="card-body-post-ed">
          <div className="label-edit-post-ed label-pg-edit-post-ed">
            <label>Tiêu đề:</label>
            <label>Tóm tắt:</label>
            <label>Thể loại:</label>
            <label>Trạng thái:</label>
            <label>Ảnh:</label>
            <label style={{ marginTop: '130px' }}>Mô tả:</label>
          </div>
          <div className="input-edit-post-ed">
            <input
              {...register('title', { required: { value: true, message: 'Title is required' } })}
              placeholder="Enter your Title"
            />
            {errors.title && <p>{errors.title.message}</p>}

            <input
              {...register('summary', { required: { value: true, message: 'Summary is required' } })}
              placeholder="Enter your Summary"
            />
            {errors.summary && <p>{errors.summary.message}</p>}

            <select
              {...register('category', { required: { value: true, message: 'Category is required' } })}
              className="form-control"
            >
              <option value="">--Select a Category--</option>
              {categories &&
                categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
            </select>

            <select {...register('status')} className="form-control" id="SLStatus">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <div className="post-thum">
              {postData.thumbnail && <img style={{ height: '120px' }} src={postData.thumbnail} alt="..."></img>}
              <input
                {...register('thumbnail', { onChange: onThumbnailChange })}
                accept="image/*"
                placeholder="Enter your Thumbnail"
                type="file"
              />
              {errors.thumbnail && <p>{errors.thumbnail.message}</p>}
            </div>

            <div style={{ width: '25rem' }}>
              <CKEditor
                editor={ClassicEditor}
                data={postData.description}
                onReady={(editor) => {
                  register('description', { required: 'Description is required.' });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setValue('description', sanitizeHTML(data));
                  trigger('description');
                }}
              />
            </div>

            <button className="btn-primary-post-ed" onClick={handleSubmit(handleSubmitFormUpdate)} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
