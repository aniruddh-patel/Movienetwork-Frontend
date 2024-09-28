import React, { useContext, useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../images/content/signinbg.jpg';
import { toast } from 'react-toastify';
import { Context } from '..';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/signin', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });
      const result = await response.json();
      if (response.ok) {
        const { username, email } = result.user; 
        setIsAuthenticated(true);
        setUser({ username, email }); 
        toast.success(`Welcome back, ${username}!`); 
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-banner">
        <img
          src={bg}
          alt="Movie Background"
        />
        <div className="signin-form-container">
          <h1>Sign in to Movie Network</h1>
          <p>Welcome back! Sign in to continue enjoying your favorite content.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="form-options">
              <a href="#" className="forgot-password">Lost your password?</a>
            </div>
            
            <button type="submit">Log In</button><br />
            {error && <p className="error-message">{error}</p>}
          </form>

          <div className="help-section">
            <Link to="/signup"><span>Don't have an account? </span>Sign-up</Link>
            <p>Need Help?</p>
            <Link to="/contactus">Contact Us or visit help center</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
