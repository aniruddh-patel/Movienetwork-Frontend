import React from "react";
import './Header.css';
import logo from "../images/content/logo.png";
import home from '../images/icons/home-button.png';
import collection from '../images/icons/movie-frame.png'
import about from '../images/icons/group.png'
import support from '../images/icons/support.png'

export const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="art" />
      <div className="nav">
        <ul className="pages">
          <a href="/" className="links"><li><img src={home} />Home</li></a>
          <a href="/" className="links"><li><img src={collection} />Collection</li></a>
          <a href="/" className="links"><li><img src={about} />About</li></a>
          <a href="/" className="links"><li><img src={support} />Contact Us</li></a>
        </ul>
      </div>
      <a href="/">
        <button className="signin_button">SignIn</button>
      </a>
    </div>
  );
};
