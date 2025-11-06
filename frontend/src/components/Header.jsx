import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute top-4 left-4">
        <img src={logo} alt="AstroGPT" className="w-14 h-14 object-contain" />
      </div>
    </header>
  );
};

export default Header;