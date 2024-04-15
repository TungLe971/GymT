import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const ClassroomList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [classrooms, setClassrooms] = useState([]);
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
      title: 'ID lớp',
      dataIndex: 'id_classroom',
      key: 'id_classroom',
      align: 'center',
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name_classroom',
      key: 'name_classroom',
      align: 'center',
    },
    {
      title: 'Nhân viên',
      dataIndex: 'staff',
      key: 'staff',
      align: 'center',
      render: (staff) => <span>{staff ? staff.name_nv : ''}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong_classroom',
      key: 'so_luong_classroom',
      align: 'center',
    },
    {
      align: 'center',
      title: 'Thời lượng',
      dataIndex: 'thoi_luong_classroom',
      key: 'thoi_luong_classroom',
      render: (thoi_luong_classroom) => {
        const renderValue = {
          1: 'Ca 1',
          2: 'Ca 2',
          3: 'Ca 3',
          4: 'Ca 4',
          default: 'Ca 5',
        };

        return <span>{renderValue[thoi_luong_classroom] || renderValue.default}</span>;
      },
    },
    {
      align: 'center',
      title: 'Ngày tập',
      dataIndex: 'day_classroom',
      key: 'day_classroom',
      render: (day_classroom) => {
        const renderValue = {
          2: 'Thứ 2',
          3: 'Thứ 3',
          4: 'Thứ 4',
          5: 'Thứ 5',
          6: 'Thứ 6',
          7: 'Thứ 7',
          1: 'Chủ nhật',
        };

        if (Array.isArray(day_classroom)) {
          return (
            <span>
              {day_classroom.map((day, index) => (
                <span key={index}>
                  {renderValue[day]}
                  {index !== day_classroom.length - 1 && ', '}
                </span>
              ))}
            </span>
          );
        } else {
          return <span>{renderValue[day_classroom]}</span>;
        }
      },
    },

    {
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status === 1 ? 'Active' : 'Inactive'} </span>,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'ngay_start',
      key: 'ngay_start',
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
      title: 'Ngày kết thúc',
      dataIndex: 'ngay_end',
      key: 'ngay_end',
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
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_classroom)}>
            Sửa
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id_classroom)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/classroom/add');
  };

  const handleEdit = (id_classroom) => {
    navigate('/classroom/edit/' + id_classroom);
    console.log('Edit classroom with id_classroom => ', id_classroom);
  };

  const handleDelete = (id_classroom) => {
    console.log('single delete with id_classroom => ', id_classroom);
    setShowModal(true);
    setDeleteItem(id_classroom);
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
    requestApi(`/classrooms/multiple?id_classrooms=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/classrooms${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setClassrooms(response.data.data);
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
        title={() => 'List Classroom'}
        dataSource={classrooms}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_classroom"
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

export default ClassroomList;
