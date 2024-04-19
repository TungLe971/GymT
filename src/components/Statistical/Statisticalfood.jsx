import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import requestApi from '../../helpers/api';
import { Button, DatePicker, Space } from 'antd';

const Statisticalfood = () => {
  const [data, setData] = useState([]);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const response = await requestApi('/foods', 'GET', { params: { page: currentPage } });
          const responseData = response.data;
          console.log('dádấ', response);
          if (totalPages === 1 && responseData.lastPage) {
            totalPages = responseData.lastPage;
          }
          responseData.data.forEach((food) => {
            const existingItemIndex = allData.findIndex((item) => item.name_food === food.name_food);
            if (existingItemIndex !== -1) {
              allData[existingItemIndex].total_money_food += food.total_money_food;
            } else {
              allData.push(food);
            }
          });

          currentPage++;
        }

        setData(allData);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy dữ liệu');
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ marginTop: 50, marginLeft: 100, backgroundColor: 'white', width: 1050, height: 500, borderRadius: 5 }}
    >
      <div style={{ marginBottom: 50, marginTop: 20, marginLeft: 20 }}>
        <Space direction="vertical" size={12}>
          <RangePicker />
          <Button type="primary">Xác nhận</Button>
        </Space>
      </div>
      <BarChart width={1000} height={300} data={data}>
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="name_food" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_money_food" name="Tổng tiền" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Statisticalfood;
