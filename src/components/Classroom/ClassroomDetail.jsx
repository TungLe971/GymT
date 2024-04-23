import React, { useEffect, useState } from 'react';
import { Table, Select, Button } from 'antd';
import requestApi from '../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as XLSX from 'xlsx';

const { Option } = Select;

const ClassroomDetail = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedClassroomMembers, setSelectedClassroomMembers] = useState([]);

  const columns = [
    {
      title: 'ID hội viên',
      dataIndex: 'member',
      key: 'member_id',
      align: 'center',
      render: (member) => <span>{member ? member.id_hv : ''}</span>,
    },
    {
      title: 'Tên hội viên',
      dataIndex: 'member',
      key: 'member_name',
      align: 'center',
      render: (member) => <span>{member ? member.name_hv : ''}</span>,
    },
    {
      title: 'SĐT',
      dataIndex: 'member',
      key: 'member_phone',
      align: 'center',
      render: (member) => <span>{member ? member.sdt_hv : ''}</span>,
    },
  ];

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi(`/cards`, 'GET', [])
      .then((response) => {
        console.log('response=> ', response);
        if (response.data && response.data.data) {
          setCards(response.data.data);
        }
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, [dispatch]);

  const handleSelectChange = (value) => {
    setSelectedClassroom(value);
    const filteredMembers = cards
      .filter((card) => card.classroom.id_classroom.toString() === value)
      .map((card) => card.member);
    setSelectedClassroomMembers(filteredMembers);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedClassroomMembers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Classroom Members');
    XLSX.writeFile(workbook, 'classroom_members.xlsx');
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
          {cards.map((card) => (
            <Option key={card.classroom.id_classroom} value={card.classroom.id_classroom}>
              {`${card.classroom.name_classroom}`}
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
