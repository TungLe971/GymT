import React from 'react';
import './Home.css';
import Headers from '../Headers/Headers';
import Heart from '../../pic/heart.png';
import Calories from '../../pic/calories.png';
import run_man from '../../pic/run_man.png';

const Home = () => {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };
  return (
    <div className="home">
      <div className="blur blur-h1"></div>
      <div className="blur blur-h2"></div>
      <div className="left-h">
        <Headers />
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
              trọn vẹn nhất.
            </span>
          </div>
        </div>

        <div className="solieu">
          <div>
            <span> + 129</span>
            <span>HUẤN LUYỆN VIÊN CHUYÊN GIA </span>
          </div>
          <div>
            <span> + 1392</span>
            <span>HỘI VIÊN ĐÃ THAM GIA</span>
          </div>
          <div>
            <span>+ 24</span>
            <span>CHƯƠNG TRÌNH RÈN LUYỆN</span>
          </div>
        </div>
      </div>

      <div className="right-h">
        <button className="btn" onClick={handleLoginClick}>
          Đăng nhập
        </button>

        <div className="heart">
          <img src={Heart} alt="" />
          <span>Nhịp tim</span>
          <span>116 bpm</span>
        </div>

        <img src={run_man} alt="" className="run-man" />

        <div className="calories">
          <img src={Calories} alt="" />
          <div>
            <span>Calo đốt cháy</span>
            <span>220 kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
