import React from 'react';
import './Reasons.css';
import image1 from '../../pic/image1.png';
import image2 from '../../pic/image2.png';
import image3 from '../../pic/image3.png';
import image4 from '../../pic/image4.png';
import nb from '../../pic/nb.png';
import adidas from '../../pic/adidas.png';
import nike from '../../pic/nike.png';
import tick from '../../pic/tick.png';

const Reasons = () => {
  return (
    <div className="Reasons" id="reasons">
      <div className="left-r">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
      </div>

      <div className="right-r">
        <span>Một số lý do</span>
        <div>
          <span className="text-rong">Tại sao </span>
          <span>chọn chúng tôi?</span>
        </div>

        <div className="details-r">
          <div>
            <img src={tick} alt=""></img>
            <span>Hơn 100+ huấn luyện viên chuyên nghiệp</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>đào tạo thông minh, nhanh chóng và hiệu quả hơn trước</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>Có chương trình miễn phí cho thành viên mới</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>CÓ CÁC ĐỐI TÁC ĐÁNG TIN CẬY</span>
          </div>
        </div>
        <span style={{ color: 'var(--gray)', fontWeight: 'normal' }}>những cộng sự của chúng tôi</span>
        <div className="partners">
          <img src={nb} alt="" />
          <img src={adidas} alt="" />
          <img src={nike} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Reasons;
