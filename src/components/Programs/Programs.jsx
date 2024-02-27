import React from 'react';
import './Programs.css';
import { programsData } from '../../data/programsData';
import RightArrow from '../../pic/rightArrow.png';

const Programs = () => {
  return (
    <div className="Programs" id="programs">
      <div className="programs-header">
        <span className="text-rong">CHƯƠNG TRÌNH</span>
        <span>KHÁM PHÁ CỦA CHÚNG TÔI</span>
        <span className="text-rong">ĐỂ ĐỊNH HÌNH BẠN</span>
      </div>

      <div className="program-categories">
        {programsData.map((program) => (
          <div className="category">
            {program.image}
            <span>{program.heading}</span>
            <span>{program.details}</span>
            <div className="join-now">
              <span>Tham gia ngay</span>
              <img src={RightArrow} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
