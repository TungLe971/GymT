import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
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
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchString, setSearchString] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('single');
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id_post',
      key: 'id_post',
      align: 'center',
    },
    {
      title: 'Tên gói',
      dataIndex: 'name_post',
      key: 'name_post',
      align: 'center',
    },
    {
      title: 'Giá',
      dataIndex: 'gia_post',
      key: 'gia_post',
      align: 'center',
      render: (text) => <span>{text}K</span>,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note_post',
      key: 'note_post',
      align: 'center',
      width: '300px',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngay_tao_post',
      key: 'ngay_tao_post',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Cập Nhật Cuối',
      dataIndex: 'ngay_cap_nhap_post',
      key: 'ngay_cap_nhap_post',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_post)}>
            Sửa
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id_post)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/post/add');
  };

  const handleEdit = (id_post) => {
    navigate('/post/edit/' + id_post);
    console.log('Edit post with id_post => ', id_post);
  };

  const handleDelete = (id_post) => {
    console.log('single delete with id_post => ', id_post);
    setShowModal(true);
    setDeleteItem(id_post);
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
    requestApi(`/posts/multiple?id_posts=${idsToDelete.toString()}`, 'DELETE', [])
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
        rowKey="id_post"
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
