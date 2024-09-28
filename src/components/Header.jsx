import React, { useContext } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/content/logo.png";
import home from '../images/icons/home-button.png';
import collection from '../images/icons/movie-frame.png'
import about from '../images/icons/group.png'
import support from '../images/icons/support.png'
import { toast } from "react-toastify";
import { Context } from "..";

export const Header = () => {
  const { isAuthenticated , setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/logout', {
        method: 'POST',
        credentials: 'include',  
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        setUser({})
        toast.success('Logout successful');
        navigate("/");
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className="header">
      <Link className="anchor" to='/'><img className="logoo" src={logo} alt="art" /></Link>
      <div className="nav">
        <ul className="pages">
          <Link to="/" className="links"><li><img src={home} />Home</li></Link>
          <Link to="/collection" className="links"><li><img src={collection} />Collection</li></Link>
          <Link to="/profile"className="links"><li><img src={about} />Profile</li></Link>
          <Link to="/contactus" className="links"><li><img src={support} />Contact Us</li></Link>
        </ul>
      </div>
      {isAuthenticated ? (
        <button className="signin_button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/signin">
          <button className="signin_button">SignIn</button>
        </Link>
      )}
    </div>
  );
};
