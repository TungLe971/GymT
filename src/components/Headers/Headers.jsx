import React from 'react';
import './Headers.css';
import Logo from '../../pic/logo.png';

const Headers = () => {
  return (
    <div className="headers">
      <img src={Logo} alt="" className="logo"></img>

      <ul className="headers-menu">
        <li>Trang chủ</li>
        <li>Chương trình</li>
        <li>Tại sao là chúng tôi</li>
        <li>Các kế hoạch</li>
        <li>Lời chứng thực</li>
      </ul>
    </div>
  );
};

export default Headers;
