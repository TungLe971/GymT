import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, AreaChart, Area } from 'recharts';
import requestApi from '../../helpers/api';

const Statisticalfood = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi('/foods', 'GET', {});
      const responseData = response.data;

      const newData = responseData.data.reduce((accumulator, food) => {
        const existingItemIndex = accumulator.findIndex((item) => item.name_food === food.name_food);
        if (existingItemIndex !== -1) {
          accumulator[existingItemIndex].total_money_food += food.total_money_food;
        } else {
          accumulator.push({ ...food });
        }
        return accumulator;
      }, []);

      setData(newData);
    } catch (err) {
      console.log(err.message || 'Lỗi khi lấy dữ liệu');
    }
  };

  return (
    <div>
      <div
        style={{
          padding: 20,
          marginTop: 50,
          marginLeft: 100,
          backgroundColor: 'white',
          width: 1050,
          height: 370,
          borderRadius: 5,
          overflowX: 'auto',
        }}
      >
        <h2>Biểu đồ doanh thu theo sản phẩm</h2>
        <div style={{ width: 'fit-content' }}>
          <BarChart width={data.length * 100} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name_food" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}K`} />
            <Legend />
            <Bar dataKey="total_money_food" name="Tổng tiền" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div
        style={{
          padding: 20,
          marginTop: 50,
          marginLeft: 100,
          backgroundColor: 'white',
          width: 1050,
          height: 370,
          borderRadius: 5,
          overflowX: 'auto',
        }}
      >
        <h2>Biểu đồ giá bán và giá nhập theo sản phẩm</h2>
        <div style={{ width: 'fit-content' }}>
          <AreaChart width={data.length * 100} height={300} data={data}>
            <defs>
              <linearGradient id="colorGiaBan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGiaNhap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="name_food" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}K`} />
            <Legend />
            <Area dataKey="gia_ban_food" name="Giá bán" fill="url(#colorGiaBan)" />
            <Area dataKey="gia_nhap_food" name="Giá nhập" fill="url(#colorGiaNhap)" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default Statisticalfood;
