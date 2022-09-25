import React from 'react';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__auth">
        {props.children}
      </div>
    </header>
  );
}

export default Header;