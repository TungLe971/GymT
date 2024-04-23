import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import requestApi from '../../../helpers/api';
import './Schedule.css';
import moment from 'moment';

const Schedule = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = () => {
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
  };

  const getListData = (classroom, currentDate) => {
    const { name_classroom, thoi_luong_classroom, status, day_classroom } = classroom;
    const dayOfWeek = currentDate.day();
    const isDayValid = day_classroom.includes(dayOfWeek.toString());

    if (!isDayValid) return null;
    return {
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
      date: currentDate.format('YYYY-MM-DD'),
    };
  };
  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const listData = classrooms.flatMap((classroom) => {
      const start = moment(classroom.ngay_start);
      const end = moment(classroom.ngay_end);
      let data = [];

      for (let d = start; d <= end; d.add(1, 'day')) {
        if (d.format('YYYY-MM-DD') === formattedDate) {
          const item = getListData(classroom, d);
          if (item) {
            data.push(item);
          }
        }
      }

      return data;
    });

    return (
      <div className="scd">
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default Schedule;
