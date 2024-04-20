import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import './StaffList.css';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const StaffList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [staffs, setStaffs] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchString, setSearchString] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('single');
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id_nv',
      key: 'id_nv',
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'name_nv',
      key: 'name_nv',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email_nv',
      key: 'email_nv',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngay_sinh_nv',
      key: 'ngay_sinh_nv',
      align: 'center',
      render: (text) => {
        if (text) {
          const startDate = new Date(text);
          const day = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate();
          const month = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
          const year = startDate.getFullYear();
          return `${day}/${month}/${year}`;
        } else {
          return '';
        }
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioi_tinh_nv',
      key: 'gioi_tinh_nv',
      align: 'center',
    },
    {
      title: 'Tuổi',
      dataIndex: 'tuoi_nv',
      key: 'tuoi_nv',
      align: 'center',
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt_nv',
      key: 'sdt_nv',
      align: 'center',
    },
    {
      title: 'TCCCD',
      dataIndex: 'tcccd_nv',
      key: 'tcccd_nv',
      align: 'center',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chuc_vu',
      key: 'chuc_vu',
      align: 'center',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'dia_chi_nv',
      key: 'dia_chi_nv',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_nv)}>
            Sửa
          </Button>
          <Button
            type="danger"
            style={{ color: 'red' }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row.id_nv)}
          >
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/staff/add');
  };

  const handleEdit = (id_nv) => {
    navigate('/staff/edit/' + id_nv);
    console.log('Edit staff with id_nv => ', id_nv);
  };

  const handleDelete = (id_nv) => {
    console.log('single delete with id_nv => ', id_nv);
    setShowModal(true);
    setDeleteItem(id_nv);
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
    requestApi(`/staffs/multiple?id_nvs=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/staffs${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setStaffs(response.data.data);
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
        title={() => 'List Staff'}
        dataSource={staffs}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_nv"
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

export default StaffList;
