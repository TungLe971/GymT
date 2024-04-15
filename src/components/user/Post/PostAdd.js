import React, { useState, useEffect } from 'react';
import './PostAdd.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import requestApi from '../../../helpers/api';
import { message, Form, Input, Button, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [form] = Form.useForm();
  const [hasFile, setHasFile] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('1');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await requestApi('/categories', 'GET');
        setCategories(res.data);
      } catch (error) {
        console.log('error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
        form.setFieldsValue({ thumbnail: e.target.result });
        setHasFile(true);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const sanitizeHTML = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleSubmitFormAdd = async (data) => {
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
      const res = await requestApi('/posts', 'POST', formData, 'json', 'multipart/form-data');
      console.log('res=> ', res);
      message.success('Thêm thành công!', 2);
      setTimeout(() => navigate('/post'), 1000);
    } catch (error) {
      console.log('error=> ', error);
      message.error('Failed to add post. Please try again later.');
    }
    dispatch(actions.controlLoading(false));
  };

  return (
    <div className="bg-primary-post">
      <div className="container-post">
        <div className="card-header-post">
          <h3 className="text-header" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '-5px' }}>
            Create Post
          </h3>
        </div>
        <div className="card-body-post">
          <div className="label-add-post">
            <label>Tiêu đề:</label>
            <label>Tóm tắt:</label>
            <label>Thể loại:</label>
            <label>Trạng thái:</label>
            <label>Ảnh:</label>
            <label style={{ marginTop: hasFile ? '130px' : '0px' }}>Mô tả:</label>
          </div>
          <div className="input-add-post">
            <Form
              form={form}
              onFinish={handleSubmitFormAdd}
              layout="vertical"
              initialValues={{ status: defaultStatus }}
            >
              <Form.Item name="title" rules={[{ required: true, message: 'Title is required' }]}>
                <Input placeholder="Enter your Title" />
              </Form.Item>

              <Form.Item name="summary" rules={[{ required: true, message: 'Summary is required' }]}>
                <Input placeholder="Enter your Summary" />
              </Form.Item>

              <Form.Item name="category" rules={[{ required: true, message: 'Category is required' }]}>
                <Select placeholder="Select a Category">
                  {categories.map((cat) => (
                    <Select.Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="status">
                <Select onChange={(value) => setDefaultStatus(value)}>
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <div className="post-thum">
                  {thumbnail && <img style={{ height: '120px' }} src={thumbnail} alt="Thumbnail" />}
                  <input type="file" onChange={handleThumbnailChange} />
                </div>
              </Form.Item>

              <Form.Item name="description">
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    form.setFieldsValue({ description: sanitizeHTML(data) });
                  }}
                />
              </Form.Item>

              <Form.Item className="it_end">
                <Button className="btn-primary1" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
