import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import requestApi from '../../helpers/api';

const Statisticalclassroom = () => {
  const [classroomData, setClassroomData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi('/cards', 'GET', {});
      const responseData = response.data.data;
      if (Array.isArray(responseData)) {
        const classroomCounts = {};

        responseData.forEach((item) => {
          const classroomName = item.classroom.name_classroom;
          if (!classroomCounts[classroomName]) {
            classroomCounts[classroomName] = 0;
          }
          classroomCounts[classroomName]++;
        });

        const data = Object.keys(classroomCounts).map((classroomName) => ({
          classroom: classroomName,
          count: classroomCounts[classroomName],
        }));

        setClassroomData(data);
      } else {
        console.error('Dữ liệu trả về không phải là một mảng');
      }
    } catch (err) {
      console.error(err.message || 'Lỗi khi lấy dữ liệu');
    }
  };

  return (
    <div
      style={{
        padding: 20,
        overflowX: 'auto',
      }}
    >
      <LineChart width={1000} height={410} data={classroomData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="classroom" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" name="hội viên" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Statisticalclassroom;
