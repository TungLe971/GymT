import React from 'react';
import { Carousel } from 'antd';
import './Statistical.css';
import Statisticalcard from './Statisticalcard';
import Statisticalpackages from './Statisticalpackages';
import Statisticalclassroom from './Statisticalclassroom';

const Statistical = () => {
  return (
    <div>
      <Carousel style={{ marginTop: 30, marginLeft: 50, width: '70rem' }}>
        <div className="slide1" key="slide1">
          <h2 style={{ textAlign: 'center', color: 'white' }}>Biểu đồ thống doanh thu theo gói</h2>
          <Statisticalcard />
        </div>

        <div className="slide2" key="slide2">
          <h2 style={{ textAlign: 'center', color: 'white' }}>Biểu đồ số lượng đăng ký gói</h2>
          <Statisticalpackages />
        </div>
        <div className="slide3" key="slide3">
          <h2 style={{ textAlign: 'center', color: 'white' }}>Biểu đồ sĩ số lớp</h2>
          <Statisticalclassroom />
        </div>
      </Carousel>
    </div>
  );
};

export default Statistical;
