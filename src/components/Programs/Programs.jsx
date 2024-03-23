import React from 'react';
import './Programs.css';
import { programsData } from '../../data/programsData';
import RightArrow from '../../pic/rightArrow.png';
import { Link } from 'react-scroll';

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
          <div className="category" key={program.id}>
            {program.image}
            <span>{program.heading}</span>
            <span>{program.details}</span>
            <div className="join-now">
              <Link to="testimonials" spy={true} smooth={true} offset={-20} duration={500}>
                <span>Tham gia ngay</span>
              </Link>
              <img src={RightArrow} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
