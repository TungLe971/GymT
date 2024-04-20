import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
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
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      align: 'center',
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      align: 'center',
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      align: 'center',
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status === 1 ? 'Active' : 'Inactive'}</span>,
    },
    {
      align: 'center',
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      align: 'center',
      title: 'Updated at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      align: 'center',
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id)}>
            Edit
          </Button>
          <Button type="danger" style={{ color: 'red' }} icon={<DeleteOutlined />} onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const onHandleRegister = () => {
    navigate('/register');
  };

  const handleEdit = (id) => {
    navigate('/user/edit/' + id);
    console.log('Edit user with id => ', id);
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
    requestApi(`/users/multiple?ids=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/users${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setUsers(response.data.data);
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
        <Button type="primary" icon={<PlusOutlined />} className="me-2" onClick={onHandleRegister}>
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
          placeholder="Email or Name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={(value) => setSearchString(value)}
          style={{ width: 234, marginLeft: 20 }}
        />
      </div>

      <Table
        style={{ marginTop: 20 }}
        title={() => 'List Users'}
        dataSource={users}
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

export default UserList;
