import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Table, Input } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;
const { Search } = Input;

const CardWarring = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchString, setSearchString] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteType, setDeleteType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());
  const currentDate = moment();

  const columns = [
    {
      title: 'ID Thẻ',
      dataIndex: 'id_card',
      key: 'id_card',
      align: 'center',
    },
    {
      title: 'Hội viên',
      dataIndex: 'member',
      key: 'member',
      align: 'center',
      render: (member) => <span>{member ? member.name_hv : ''}</span>,
    },
    {
      title: 'Gmail hội viên',
      dataIndex: 'member',
      key: 'member',
      align: 'center',
      render: (member) => <span>{member ? member.email_hv : ''}</span>,
    },
    {
      title: 'SĐT hội viên',
      dataIndex: 'member',
      key: 'member',
      align: 'center',
      render: (member) => <span>{member ? member.sdt_hv : ''}</span>,
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
          const startDate = moment(text);
          return startDate.format('DD/MM/YYYY');
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
          const endDate = moment(text);
          return endDate.format('DD/MM/YYYY');
        } else {
          return '';
        }
      },
    },
  ];

  const onHandleAdd = () => {
    navigate('/card/add');
  };

  const handleMultiDelete = () => {
    console.log('multi delete => ', selectedRows);
    setShowModal(true);
    setDeleteType('multi');
  };

  const requestDeleteApi = () => {
    let idsToDelete = deleteType === selectedRows;
    dispatch(actions.controlLoading(true));
    requestApi(`/cards/multiple?id_cards=${idsToDelete.toString()}`, 'DELETE', [])
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
    requestApi(`/cards${query}`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        // Lọc các thẻ có ngày kết thúc nhỏ hơn ngày hiện tại
        const filteredCards = response.data.data.filter((card) => {
          return card.ngay_end && moment(card.ngay_end) < currentDate;
        });
        setCards(filteredCards);
        setNumOfPage(response.data.total);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
    // eslint-disable-next-line
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
        title={() => 'List Card'}
        dataSource={cards}
        columns={columns}
        pagination={{
          total: numOfPage,
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
          onShowSizeChange: setItemsPerPage,
        }}
        rowKey="id_card"
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

export default CardWarring;
