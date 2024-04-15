import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import './PostList.css';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchString, setSearchString] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('single');
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Tóm tắt',
      dataIndex: 'summary',
      key: 'summary',
      align: 'center',
      maxWidth: '200px',
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    //   align: 'center',
    //   maxWidth: '200px',
    // },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: 'center',
      width: '200px',
      render: (thumbnail) => (
        <img
          src={thumbnail ? `${process.env.REACT_APP_API_URL}/${thumbnail}` : ''}
          alt="Ảnh"
          style={{ maxHeight: 50 }}
        />
      ),
    },
    {
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status === 1 ? 'Active' : 'Inactive'}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Cập Nhật Cuối',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id)}>
            Sửa
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/post/add');
  };

  const handleEdit = (id) => {
    navigate('/post/edit/' + id);
    console.log('Edit post with id => ', id);
  };

  const handleDelete = (id) => {
    console.log('single delete with id => ', id);
    setShowModal(true);
    setDeleteItem(id);
    setDeleteType('single');
  };

  const handleMultiDelete = () => {
    console.log('multi delete => ', selectedRows);
    setShowModal(true);
    setDeleteType('multi');
  };

  const requestDeleteApi = () => {
    let idsToDelete = deleteType === 'single' ? [deleteItem] : selectedRows;
    dispatch(actions.controlLoading(true));
    requestApi(`/posts/multiple?ids=${idsToDelete.toString()}`, 'DELETE', [])
      .then((response) => {
        setShowModal(false);
        setRefresh(Date.now());
        setSelectedRows([]);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
        dispatch(actions.controlLoading(false));
      });
  };

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
    requestApi(`/posts${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setPosts(response.data.data);
        setNumOfPage(response.data.total);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage, searchString, refresh, dispatch]);

  return (
    <div style={{ padding: 30, width: '100%' }}>
      <div className="mb-3">
        <Button type="primary" icon={<PlusOutlined />} className="me-2" onClick={onHandleAdd}>
          Add new
        </Button>
        {selectedRows.length > 0 && (
          <Button
            type="danger"
            style={{ marginLeft: 20, background: 'red' }}
            onClick={handleMultiDelete}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        )}
        <Search
          placeholder="Name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={(value) => setSearchString(value)}
          style={{ width: 234, marginLeft: 20 }}
        />
      </div>

      <Table
        style={{ marginTop: 20 }}
        title={() => 'List Post'}
        dataSource={posts}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRowKeys);
          },
        }}
      />
      <Modal
        title="Confirmation"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)}>
            <CloseOutlined /> Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={requestDeleteApi}>
            <CheckOutlined /> Delete
          </Button>,
        ]}
      >
        <Text>Are you sure want to delete?</Text>
      </Modal>
    </div>
  );
};

export default PostList;
