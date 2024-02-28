import React from 'react';
import './Plans.css';
import { plansData } from '../../data/plansData';
import whiteTick from '../../pic/whiteTick.png';

const Plans = () => {
  return (
    <div className="Plans-container">
      <div className="programs-header" style={{ gap: '2rem' }}>
        <span className="text-rong">sẵn sàng để bắt đầu</span>
        <span>hành trình của bạn</span>
        <span className="text-rong">với chúng tôi</span>
      </div>

      <div className="plans">
        {plansData.map((plan, i) => (
          <div className="plan" key={i}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>{plan.price} VNĐ</span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div className="feature">
                  <img src={whiteTick} alt="" />
                  <span key={i}>{feature}</span>
                </div>
              ))}
            </div>

            <div>
              <span>{'Xem thêm lợi ích ->'}</span>
            </div>
            <button className="btn">Tham gia ngay</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
