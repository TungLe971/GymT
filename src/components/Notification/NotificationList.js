import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import './NotificationList.css';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const NotificationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
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
      dataIndex: 'id_n',
      key: 'id_n',
      align: 'center',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title_n',
      key: 'title_n',
      align: 'center',
    },
    {
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status_n',
      key: 'status_n',
      render: (status_n) => <span>{status_n === 1 ? 'Active' : 'Inactive'} </span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngay_tao_n',
      key: 'ngay_tao_n',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Cập Nhật Cuối',
      dataIndex: 'ngay_cap_nhap_n',
      key: 'ngay_cap_nhap_n',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_n)}>
            Sửa
          </Button>
          <Button
            type="danger"
            style={{ color: 'red' }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row.id_n)}
          >
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/notification/add');
  };

  const handleEdit = (id_n) => {
    navigate('/notification/edit/' + id_n);
    console.log('Edit notification with id_n => ', id_n);
  };

  const handleDelete = (id_n) => {
    console.log('single delete with id_n => ', id_n);
    setShowModal(true);
    setDeleteItem(id_n);
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
    requestApi(`/notifications/multiple?id_ns=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/notifications${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setNotifications(response.data.data);
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
        title={() => 'List Notification'}
        dataSource={notifications}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_n"
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

export default NotificationList;
