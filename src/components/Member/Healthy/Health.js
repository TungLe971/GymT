import React, { useEffect, useState } from 'react';
import { Button, Table, Input } from 'antd';
import requestApi from '../../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const HealthList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchString, setSearchString] = useState('');

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
      title: 'Chiều cao',
      dataIndex: 'chieu_cao',
      key: 'chieu_cao',
      align: 'center',
    },
    {
      title: 'Cân nặng',
      dataIndex: 'can_nang',
      key: 'can_nang',
      align: 'center',
    },
    {
      title: 'Phần trăm mỡ',
      dataIndex: 'phan_tram_mo',
      key: 'phan_tram_mo',
      align: 'center',
    },
    {
      title: 'Tích luỹ',
      dataIndex: 'diem_tich_luy',
      key: 'diem_tich_luy',
      align: 'center',
    },
    {
      title: 'Cập Nhật Cuối',
      dataIndex: 'ngay_cap_nhap_hv',
      key: 'ngay_cap_nhap_hv',
      align: 'center',
      render: (text) => <span>{text ? new Date(text).toLocaleString() : ''}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1" onClick={() => handleEdit(row.id_hv)}>
            Sửa
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (id_hv) => {
    navigate('/health/edit/' + id_hv);
    console.log('Edit health with id_hv => ', id_hv);
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
  }, [currentPage, itemsPerPage, searchString, dispatch]);

  return (
    <div style={{ padding: 30, width: '100%' }}>
      <div className="mb-3">
        <Search
          placeholder="ID or Name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={(value) => setSearchString(value)}
          style={{ width: 234, marginLeft: 20 }}
        />
      </div>

      <Table
        style={{ marginTop: 20 }}
        title={() => 'List Member Health'}
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
      />
    </div>
  );
};

export default HealthList;
