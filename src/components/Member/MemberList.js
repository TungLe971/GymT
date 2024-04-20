import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

const MemberList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
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
      dataIndex: 'id_hv',
      key: 'id_hv',
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'name_hv',
      key: 'name_hv',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email_hv',
      key: 'email_hv',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngay_sinh_hv',
      key: 'ngay_sinh_hv',
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
      dataIndex: 'gioi_tinh_hv',
      key: 'gioi_tinh_hv',
      align: 'center',
    },
    {
      title: 'Tuổi',
      dataIndex: 'tuoi_hv',
      key: 'tuoi_hv',
      align: 'center',
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt_hv',
      key: 'sdt_hv',
      align: 'center',
    },
    {
      title: 'TCCCD',
      dataIndex: 'tcccd_hv',
      key: 'tcccd_hv',
      align: 'center',
    },
    {
      title: 'Tích luỹ',
      dataIndex: 'diem_tich_luy',
      key: 'diem_tich_luy',
      align: 'center',
    },
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'ngay_tao_hv',
    //   key: 'ngay_tao_hv',
    // render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    // },
    // {
    //   title: 'Cập Nhật Cuối',
    //   dataIndex: 'ngay_cap_nhap_hv',
    //   key: 'ngay_cap_nhap_hv',
    // render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    // },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_hv)}>
            Sửa
          </Button>
          <Button
            type="danger"
            style={{ color: 'red' }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row.id_hv)}
          >
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onHandleAdd = () => {
    navigate('/member/add');
  };

  const handleEdit = (id_hv) => {
    navigate('/member/edit/' + id_hv);
    console.log('Edit member with id_hv => ', id_hv);
  };

  const handleDelete = (id_hv) => {
    console.log('single delete with id_hv => ', id_hv);
    setShowModal(true);
    setDeleteItem(id_hv);
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
    requestApi(`/members/multiple?id_hvs=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/members${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        setMembers(response.data.data);
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
        title={() => 'List Member'}
        dataSource={members}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_hv"
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

export default MemberList;
