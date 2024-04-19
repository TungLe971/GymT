import React from 'react';
import { Carousel } from 'antd';
// import requestApi from '../../helpers/api';
import './Statistical.css';

const contentStyle = {
  height: '360px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Statistical = () => {
  return (
    <div>
      <Carousel style={{ marginTop: 50, marginLeft: 50, width: '50rem' }} autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
};
export default Statistical;
