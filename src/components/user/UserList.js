import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import DataTable from '../common/DataTable';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
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
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
    },
    {
      title: 'Updated at',
      dataIndex: 'updated_at',
    },
    {
      title: 'Actions',
      render: (_, row) => (
        <>
          <Button type="primary" icon={<EditOutlined />} className="me-1">
            Edit
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

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
        setNumOfPage(response.data.lastPage);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage, searchString, refresh]);

  return (
    <div>
      <div className="mb-3">
        <Button type="primary" icon={<PlusOutlined />} className="me-2">
          Add new
        </Button>
        {selectedRows.length > 0 && (
          <Button type="danger" onClick={handleMultiDelete} icon={<DeleteOutlined />}>
            Delete
          </Button>
        )}
      </div>
      <DataTable
        title="List Users"
        data={users}
        columns={columns}
        numOfPage={numOfPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onChangeItemsPerPage={setItemsPerPage}
        onKeySearch={setSearchString}
        onSelectedRows={setSelectedRows}
      />
      <Modal
        title="Confirmation"
        visible={showModal}
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
