import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';
import pic404 from '../../pic/404.jpg';

const PageNotFound = () => {
  return (
    <div className="page-404">
      <div className="content-404">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>I tried to catch some fog, but I mist</p>
        <Link className="link-404" to="/">
          Back to Dashboard
        </Link>
      </div>
      <img src={pic404} alt="404" />
    </div>
  );
};

export default PageNotFound;
