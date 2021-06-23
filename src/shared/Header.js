import React from 'react';
import logo from '../assets/images/logo.svg';

function Header() {
  return (
    <header>
      <div className="header-container">
        <span
          className="header-logo"
          style={{ backgroundImage: `url(${logo})` }}
        ></span>
      </div>
    </header>
  );
}

export default Header;
