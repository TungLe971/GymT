import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';
import requestApi from '../../helpers/api';

const Statisticalcard = () => {
  const [packageData, setPackageData] = useState([]);
  const [, setPackageInfo] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi('/cards', 'GET', {});
      const responseData = response.data.data;
      if (Array.isArray(responseData)) {
        const packageTotal = {};

        const packageNames = {};
        responseData.forEach((item) => {
          const packageId = item.packages.id_packages;
          const packageName = item.packages.name_packages;
          packageNames[packageId] = packageName;
        });
        setPackageInfo(packageNames);

        responseData.forEach((item) => {
          const packageId = item.packages.id_packages;
          const packagePrice = item.total_money_card;

          packageTotal[packageId] = packageTotal[packageId] ? packageTotal[packageId] + packagePrice : packagePrice;
        });

        const data = Object.keys(packageTotal).map((packageId) => ({
          name: packageNames[packageId],
          value: packageTotal[packageId],
        }));

        setPackageData(data);
      } else {
        console.error('Dữ liệu trả về không phải là một mảng');
      }
    } catch (err) {
      console.error(err.message || 'Lỗi khi lấy dữ liệu');
    }
  };
  const lightColors = [
    '#FF7F50',
    '#FF6347',
    '#FF4500',
    '#FFD700',
    '#FFA500',
    '#FF8C00',
    '#FF69B4',
    '#FF1493',
    '#FF00FF',
    '#00CED1',
    '#00BFFF',
    '#4682B4',
    '#6495ED',
    '#ADD8E6',
    '#87CEFA',
    '#B0E0E6',
    '#F0E68C',
    '#FFFFE0',
    '#FAFAD2',
    '#FFE4E1',
  ];

  const getRandomColor = () => lightColors[Math.floor(Math.random() * lightColors.length)];

  return (
    <div style={{ marginTop: -40 }}>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={packageData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={180}
            fill={getRandomColor()}
            dataKey="value"
            label={({ value, percent }) => `${value}K ${(percent * 100).toFixed(2)}%`}
          >
            {packageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statisticalcard;
