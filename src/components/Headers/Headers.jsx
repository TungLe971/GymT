import React, { useState } from 'react';
import './Headers.css';
import Logo from '../../pic/logo.png';
import { Link } from 'react-scroll';

const Headers = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="Headers" id="headers">
      <img src={Logo} alt="" className="logo"></img>
      {menuOpened === false && (
        <ul className="Headers-menu">
          <li>
            <Link onClick={() => setMenuOpened(false)} activeClass="active-h" to="headers" span="true" smooth="true">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="programs" span="true" smooth="true">
              Chương trình
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="reasons" span="true" smooth="true">
              Tại sao là chúng tôi
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="plans" span="true" smooth="true">
              Các kế hoạch
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="testimonials" span="true" smooth="true">
              Lời chứng thực
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Headers;
