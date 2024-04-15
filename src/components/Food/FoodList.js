import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
// import './foodList.css';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const FoodList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [foods, setFoods] = useState([]);
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
      dataIndex: 'id_food',
      key: 'id_food',
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'name_food',
      key: 'name_food',
      align: 'center',
    },
    {
      title: 'Lượng Còn',
      dataIndex: 'so_luong_con_food',
      key: 'so_luong_con_food',
      align: 'center',
    },
    {
      title: 'Loại',
      dataIndex: 'loai_food',
      key: 'loai_food',
      align: 'center',
    },
    {
      title: 'Giá Bán',
      dataIndex: 'gia_ban_food',
      key: 'gia_ban_food',
      align: 'center',
      render: (text) => <span>{text}K</span>,
    },
    {
      title: 'Vốn lãi',
      dataIndex: 'total_money_food',
      key: 'total_money_food',
      align: 'center',
      render: (text) => <span>{text}K</span>,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note_food',
      key: 'note_food',
      align: 'center',
    },
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'ngay_tao_food',
    //   key: 'ngay_tao_food',
    //   render: (text) => {
    //   if (text) {
    //     const startDate = new Date(text);
    //     const day = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate();
    //     const month = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
    //     const year = startDate.getFullYear();
    //     return `${day}/${month}/${year}`;
    //   } else {
    //     return '';
    //   }
    // },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_food)}>
            Sửa
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id_food)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/food/add');
  };

  const handleEdit = (id_food) => {
    navigate('/food/edit/' + id_food);
    console.log('Edit food with id_food => ', id_food);
  };

  const handleDelete = (id_food) => {
    console.log('single delete with id_food => ', id_food);
    setShowModal(true);
    setDeleteItem(id_food);
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
    requestApi(`/foods/multiple?id_foods=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/foods${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setFoods(response.data.data);
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
        title={() => 'List Food'}
        dataSource={foods}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_food"
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

export default FoodList;
