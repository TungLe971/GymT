import React from 'react';
import './Header.css';
import Logo from '../../pic/logo.png';

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="" className="logo"></img>

      <ul className="header-menu">
        <li>Trang chủ</li>
        <li>Chương trình</li>
        <li>Tại sao là chúng tôi</li>
        <li>Các kế hoạch</li>
        <li>Lời chứng thực</li>
      </ul>
    </div>
  );
};

export default Header;
