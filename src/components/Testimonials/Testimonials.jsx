import React, { useState } from 'react';
import './Testimonials.css';
import { testimonialsData } from '../../data/testimonialsData';
import leftArrows from '../../pic/leftArrow.png';
import rightArrows from '../../pic/rightArrow.png';

const Testimonials = () => {
  const [t1, t2] = useState(0);
  const tLength = testimonialsData.length;
  return (
    <div className="Testimonials">
      <div className="left-t">
        <span>Lời chứng thực</span>
        <span className="text-rong">Những gì họ</span>
        <span>nói về chúng tôi</span>
        <span>{testimonialsData[t1].review}</span>
        <span>
          <span style={{ color: 'var(--orange)' }}>{testimonialsData[t1].name}</span>
          <span> - {testimonialsData[t1].status}</span>
        </span>
      </div>

      <div className="right-t">
        <div></div>
        <div></div>
        <img src={testimonialsData[t1].image} alt="" />
        <div className="arrows">
          <img
            onClick={() => {
              t1 === 0 ? t2(tLength - 1) : t2((prev) => prev - 1);
            }}
            src={leftArrows}
            alt=""
          ></img>

          <img
            onClick={() => {
              t1 === tLength - 1 ? t2(0) : t2((prev) => prev + 1);
            }}
            src={rightArrows}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
