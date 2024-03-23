import React from 'react';
import './Home.css';
import Headers from '../Headers/Headers';
import Heart from '../../pic/heart.png';
import Calories from '../../pic/calories.png';
import run_man from '../../pic/run_man.png';
import { motion } from 'framer-motion';
import NumberCourter from 'number-counter';

const Home = () => {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const transition = { type: 'spring', duration: 3 };
  return (
    <div className="Home" id="home">
      <div className="blur blur-h1"></div>
      <div className="blur blur-h2"></div>
      <div className="left-h">
        <Headers />
        <div className="tieu-de">
          <motion.div
            initial={{ left: '180px' }}
            whileInView={{ left: '8px' }}
            transition={{ ...transition, type: 'tween' }}
          ></motion.div>
          <span>Chúng tôi luôn dõi theo bạn!</span>
        </div>

        <div className="Home-text">
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
            <span>
              <NumberCourter end={129} start={99} delay="6" preFix="+"></NumberCourter>
            </span>
            <span>HUẤN LUYỆN VIÊN CHUYÊN GIA </span>
          </div>
          <div>
            <span>
              <NumberCourter end={1392} start={999} delay="4" preFix="+"></NumberCourter>
            </span>
            <span>HỘI VIÊN ĐÃ THAM GIA</span>
          </div>
          <div>
            <span>
              <NumberCourter end={24} start={9} delay="3" preFix="+"></NumberCourter>
            </span>
            <span>CHƯƠNG TRÌNH RÈN LUYỆN</span>
          </div>
        </div>
      </div>

      <div className="right-h">
        <button className="btn" onClick={handleLoginClick}>
          Đăng nhập
        </button>

        <motion.div
          className="heart"
          transition={transition}
          initial={{ right: '-1rem' }}
          whileInView={{ right: '4rem' }}
        >
          <img src={Heart} alt="" />
          <span>Nhịp tim</span>
          <span>116 bpm</span>
        </motion.div>
        <motion.img
          transition={transition}
          initial={{ right: '3rem' }}
          whileInView={{ right: '7rem' }}
          src={run_man}
          alt=""
          className="run-man"
        />

        <motion.div
          className="calories"
          transition={transition}
          initial={{ right: '37rem' }}
          whileInView={{ right: '28rem' }}
        >
          <img src={Calories} alt="" />
          <div>
            <span>Calo đốt cháy</span>
            <span>220 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
