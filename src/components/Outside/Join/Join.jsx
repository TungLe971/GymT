import React, { useRef, useState } from 'react';
import './Join.css';
import emailjs from '@emailjs/browser';

const Join = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }

    emailjs
      .sendForm('service_tlbxnjk', 'gymt_123', form.current, {
        publicKey: 'xiAQ8wWWiXASbSZtv',
      })
      .then(() => {
        setSent(true);
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Gửi email thất bại:', error);
      });
  };

  function handleClick() {
    const button = document.querySelector('.btn-j');
    button.classList.add('btn-clicked');
    setTimeout(() => {
      button.classList.remove('btn-clicked');
    }, 10);
  }

  const handleClose = () => {
    setSent(false);
    // setEmail('');
  };

  return (
    <div className="Join" id="join-us">
      <div className="left-j">
        <hr />
        <div>
          <span className="text-rong">Bạn đã sẵn sàng</span>
          <span> hoàn thiện</span>
        </div>

        <div>
          <span>cơ thể của mình</span>
          <span className="text-rong"> với chúng tôi?</span>
        </div>
      </div>

      <div className="right-j">
        {!sent && (
          <div className="form-unsent">
            <form ref={form} action="" className="email-j" onSubmit={sendEmail}>
              <input
                type="email"
                name="user_email"
                placeholder="Nhập email ở đây"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-j" onClick={handleClick}>
                Tham gia ngay
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
        {sent && (
          <div className="email-sent">
            <form action="" className="email-j j">
              <input type="email" name="user_email" placeholder="Đã gửi yêu cầu" disabled />
              <button className="btn btn-j" onClick={handleClose}>
                Đóng
              </button>
            </form>
            <p className="done-message">Đã gửi yêu cầu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
