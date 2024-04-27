import React, { useEffect, useState } from 'react';
import { Table, Select, Button } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as XLSX from 'xlsx';

const { Option } = Select;

const ClassroomDetail = () => {
  const dispatch = useDispatch();
  const [classrooms, setClassrooms] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedClassroomMembers, setSelectedClassroomMembers] = useState([]);

  const columns = [
    {
      title: 'ID hội viên',
      dataIndex: 'id_hv',
      key: 'member_id',
      align: 'center',
    },
    {
      title: 'Tên hội viên',
      dataIndex: 'name_hv',
      key: 'member_name',
      align: 'center',
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt_hv',
      key: 'member_phone',
      align: 'center',
    },
  ];

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi(`/classrooms`, 'GET', [])
      .then((response) => {
        console.log('classrooms response=> ', response);
        if (response && response.data.data && Array.isArray(response.data.data)) {
          setClassrooms(response.data.data);
        }
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });

    requestApi(`/cards`, 'GET', [])
      .then((response) => {
        console.log('cards response=> ', response);
        if (response && response.data.data && Array.isArray(response.data.data)) {
          setAllCards(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleSelectChange = (value) => {
    setSelectedClassroom(value);
    if (value) {
      dispatch(actions.controlLoading(true));
      requestApi(`/cards?id_classroom=${value}`, 'GET', [])
        .then((response) => {
          console.log('cards response=> ', response);
          if (response && response.data.data && Array.isArray(response.data.data)) {
            const classroomCards = allCards.filter((card) => card.classroom.id_classroom === value);
            const members = classroomCards.map((card) => card.member);
            setSelectedClassroomMembers(members);
          }
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.controlLoading(false));
        });
    } else {
      setSelectedClassroomMembers([]);
    }
  };

  const handleExportExcel = () => {
    if (selectedClassroomMembers.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedClassroomMembers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Classroom Members');
      XLSX.writeFile(workbook, 'classroom_members.xlsx');
    }
  };

  return (
    <div style={{ padding: 30, width: '100%' }}>
      <div className="mb-3">
        <Select
          placeholder="Select Classroom"
          allowClear
          style={{ width: 234, marginLeft: 20 }}
          onChange={handleSelectChange}
          value={selectedClassroom}
        >
          {classrooms.map((classroom) => (
            <Option key={classroom.id_classroom} value={classroom.id_classroom}>
              {`${classroom.name_classroom}`}
            </Option>
          ))}
        </Select>
        <Button
          style={{ marginLeft: 30, background: 'green', ':hover': { background: 'darkgreen !important' } }}
          type="primary"
          onClick={handleExportExcel}
          disabled={!selectedClassroom}
        >
          Export Excel
        </Button>
      </div>

      <Table
        style={{ marginTop: 20 }}
        title={() => 'Danh sách hội viên'}
        dataSource={selectedClassroomMembers}
        columns={columns}
        pagination={false}
        rowKey="id_hv"
      />
    </div>
  );
};

export default ClassroomDetail;
