import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import requestApi from '../../../helpers/api';
import './Schedule.css';

const Schedule = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    requestApi('/classrooms', 'GET')
      .then((response) => {
        if (response && response.data && response.data.data) {
          setClassrooms(response.data.data);
        } else {
          console.error('Invalid data format:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching classrooms:', error);
      });
  }, []);

  const getListData = (classroom) => {
    const { name_classroom, thoi_luong_classroom, ngay_start, ngay_end, status } = classroom;
    const start = new Date(ngay_start);
    const end = new Date(ngay_end);

    let listData = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      listData.push({
        type: status === 1 ? 'success' : 'error',
        content: `${name_classroom}, ${
          thoi_luong_classroom === 1
            ? 'Ca 1'
            : thoi_luong_classroom === 2
            ? 'Ca 2'
            : thoi_luong_classroom === 3
            ? 'Ca 3'
            : thoi_luong_classroom === 4
            ? 'Ca 4'
            : 'Ca 5'
        }`,
        date: d,
      });
    }
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = classrooms
      .flatMap((classroom) => getListData(classroom))
      .filter((item) => new Date(item.date).toLocaleDateString() === new Date(value._d).toLocaleDateString());
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default Schedule;
