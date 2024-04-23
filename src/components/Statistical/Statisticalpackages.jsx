import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import requestApi from '../../helpers/api';

const Statisticalpackages = () => {
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi('/cards', 'GET', {});
      const responseData = response.data.data;
      if (Array.isArray(responseData)) {
        const packageCounts = {};

        responseData.forEach((item) => {
          const packageName = item.packages.name_packages;
          if (!packageCounts[packageName]) {
            packageCounts[packageName] = 0;
          }
          packageCounts[packageName]++;
        });

        const data = Object.keys(packageCounts).map((packageName) => ({
          name_packages: packageName,
          count: packageCounts[packageName],
        }));

        setPackageData(data);
      } else {
        console.error('Dữ liệu trả về không phải là một mảng');
      }
    } catch (err) {
      console.error(err.message || 'Lỗi khi lấy dữ liệu');
    }
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={packageData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name_packages" />
        <Radar name="Packages" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Statisticalpackages;
