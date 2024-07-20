import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ isAuthenticated, children }) => {
  return (
    <div className="main-layout">
      {isAuthenticated && <Navbar />}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
