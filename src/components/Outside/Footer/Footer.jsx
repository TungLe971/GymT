import React from 'react';
import './Footer.css';
import Github from '../../../pic/github.png';
import Instagram from '../../../pic/instagram.png';
import LinkedIn from '../../../pic/linkedin.png';
import House from '../../../pic/home.png';
import FB from '../../../pic/facebook.png';
import YT from '../../../pic/youtube.png';
import SĐT from '../../../pic/call.png';
import Mail from '../../../pic/mail.png';

const Footer = () => {
  return (
    <div className="Footer-container">
      <hr />
      <div className="footer">
        <div className="logo-f1">
          <div>
            <img src={House} alt="" />
            <span>Số 55 đường Giải Phóng, Hai Bà Trưng, Hà Nội.</span>
          </div>
          <div>
            <img src={SĐT} alt="" />
            <span>0397439202</span>
          </div>
          <div>
            <img src={Mail} alt="" />
            <span>lmt3997@gmail.com</span>
          </div>
        </div>
        <div className="logo-f">
          <a href="https://github.com/TungLe971/GymT.git" target="_blank" rel="noopener noreferrer">
            <img src={Github} alt="" />
          </a>
          <a href="https://www.instagram.com/tungmle39/" target="_blank" rel="noopener noreferrer">
            <img src={Instagram} alt="" />
          </a>
          <a href="https://www.youtube.com/channel/UCmgrrNZTzwycbQSgj9LZI1A" target="_blank" rel="noopener noreferrer">
            <img src={YT} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/t%C3%B9ng-l%C3%AA-7552b22b8/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedIn} alt="" />
          </a>
          <a href="https://www.facebook.com/TungLeeMinh/" target="_blank" rel="noopener noreferrer">
            <img src={FB} alt="" />
          </a>
        </div>
        <div className="blur blur-f-1"></div>
        <div className="blur blur-f-2"></div>
      </div>
    </div>
  );
};

export default Footer;
