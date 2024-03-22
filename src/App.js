import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Plans from './components/Plans/Plan';
import Testimonials from './components/Testimonials/Testimonials';
import Join from './components/Join/Join';
import Footer from './components/Footer/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './layouts/Main';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import UserList from './components/user/UserList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn && (
        <>
          <Home />
          <Programs />
          <Reasons />
          <Plans />
          <Testimonials />
          <Join />
          <Footer />
        </>
      )}
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Main />}>
            <Route element={<PrivateRoutes />}>
              {isLoggedIn && <Route path="/" element={<Dashboard />} />}
              {isLoggedIn && <Route path="/user" element={<UserList />} />}
            </Route>
          </Route>
          <Route element={<PublicRoutes />}>
            {/* <Route path="/user" element={<UserList />} />
            <Route path="/" element={<Dashboard />} /> */}
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Route>
        </Route>
        {isLoggedIn && <Navigate to="/" />}
      </Routes>
    </div>
  );
}

export default App;
