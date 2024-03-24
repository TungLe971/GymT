import React, { useState } from 'react';
import './Testimonials.css';
import { testimonialsData } from '../../../data/testimonialsData';
import leftArrows from '../../../pic/leftArrow.png';
import rightArrows from '../../../pic/rightArrow.png';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [t1, t2] = useState(0);
  const tLength = testimonialsData.length;
  const transition = { type: 'spring', duration: 3 };

  return (
    <div className="Testimonials" id="testimonials">
      <div className="left-t">
        <span>Lời chứng thực</span>
        <span className="text-rong">Những gì họ</span>
        <span>nói về chúng tôi</span>
        <motion.span
          key={t1}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={transition}
        >
          {testimonialsData[t1].review}
        </motion.span>
        <span>
          <span style={{ color: 'var(--orange)' }}>{testimonialsData[t1].name}</span>
          <span> - {testimonialsData[t1].status}</span>
        </span>
      </div>

      <div className="right-t">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ...transition, duration: 2 }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ...transition, duration: 2 }}
        ></motion.div>

        <motion.img
          key={t1}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={transition}
          src={testimonialsData[t1].image}
          alt=""
        />
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
        <div className="blur blur-t"></div>
      </div>
    </div>
  );
};

export default Testimonials;
