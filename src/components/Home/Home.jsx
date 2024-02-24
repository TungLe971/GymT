import React from 'react';
import './Home.css';
import Header from '../Header/Header';
const Home = () => {
  return (
    <div className="home">
      <div className="left-h">
        <Header />
        <div className="tieu-de">
          <div></div>
          <span>Chúng tôi luôn dõi theo bạn!</span>
        </div>

        <div className="home-text">
          <div>
            <span className="text-rong">ĐỊNH HÌNH </span>
            <span>CỦA BẠN</span>
          </div>
          <div>
            <span>VỀ THÂN HÌNH LÝ TƯỞNG?</span>
          </div>
          <div>
            <span>
              Tại đây, chúng tôi sẽ giúp bạn định hình và xây dựng thân hình lý tưởng và tận hưởng cuộc sống một cách
              trọn vẹn nhất
            </span>
          </div>
        </div>
      </div>
      <div className="right-h">right side</div>
    </div>
  );
};

export default Home;
