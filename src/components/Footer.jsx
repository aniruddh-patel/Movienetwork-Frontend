import React, { useEffect } from 'react'
import './Footer.css'
import logo from '../images/content/logo.png'
import { Link } from 'react-router-dom'



export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-social">
          <div className="logo">
            <Link to="/" ><img className='logooo' src={logo} alt="" /></Link>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <div className="link-section">
            <h4>Movies</h4>
            <ul>
              <li><a href="#">Drama</a></li>
              <li><a href="#">Family</a></li>
              <li><a href="#">Reality</a></li>
              <li><a href="#">Comedy</a></li>
              <li><a href="#">Action</a></li>
            </ul>
          </div>
          <div className="link-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Ticket Support</a></li>
              <li><a href="#">My Account</a></li>
            </ul>
          </div>
          <div className="link-section">
            <h4>About MN</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">News & Articles</a></li>
              <li><a href="#">Legal Notice</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
        <p>&copy; 2024 Movie Network Media. All rights reserved. Present by MNDeveloper.</p>
      </div>
    </footer>
  );
}
