import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import requestApi from '../../helpers/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const AGE_GROUPS = ['0-25', '26-35', '36-45', '46-55', 'Over 55'];

const Statisticalmember = () => {
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi('/members', 'GET', {});
      const responseData = response.data;

      const ageGroups = AGE_GROUPS.map((name) => ({ name, value: 0 }));

      responseData.data.forEach((member) => {
        const age = member.tuoi_hv;
        if (age <= 25) {
          ageGroups[0].value++;
        } else if (age <= 35) {
          ageGroups[1].value++;
        } else if (age <= 45) {
          ageGroups[2].value++;
        } else if (age <= 55) {
          ageGroups[3].value++;
        } else {
          ageGroups[4].value++;
        }
      });

      setAgeData(ageGroups);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ width: '100%', height: 600 }}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Biểu đồ phân phối tuổi của các thành viên</h2>
      <div style={{ width: '100%', height: 500, display: 'flex' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={ageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
            >
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            right: '6rem',
            top: '18rem',
          }}
        >
          <ul>
            {ageData.map((entry, index) => (
              <li
                key={`legend-${index}`}
                style={{
                  width: 100,
                  marginTop: 15,
                  color: COLORS[index % COLORS.length],
                  listStyleType: 'none',
                }}
              >
                <span>{`${entry.name}: `}</span>
                <span>{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statisticalmember;
