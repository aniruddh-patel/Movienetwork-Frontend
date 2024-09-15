import React, { useEffect, useState } from 'react';
import './SignUp.css';
import bg from '../images/content/signinbg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',  // Changed from 'phone' to 'phone_number'
    genres: []         // Kept as it is since genres is an array
  });

  const genresOptions = ['Action', 'Horror', 'Romantic', 'Mystery', 'Comedy', 'Biography'];
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenreClick = (genre) => {
    if (!formData.genres.includes(genre)) {
      setFormData({
        ...formData,
        genres: [...formData.genres, genre]
      });
    }
  };

  const removeGenre = (genreToRemove) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter((genre) => genre !== genreToRemove)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,  
          genres: formData.genres
        }),
      });

      const data = await response.json(); 

      if (response.ok) {
        navigate('/signin'); 
        toast.success(data.message);  
      } else {
        toast.error(data.message);  
        console.error('Failed to sign up:', data.message);
      }
    } catch (error) {
      toast.error('Error during sign up: ' + error.message);
      console.error('Error during sign up:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 130);
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-banner">
        <img src={bg} alt="Movie Background" />
        <div className="signup-form-container">
          <h1>Sign Up for Movie Network</h1>
          <p>Join us today and explore a world of unlimited entertainment.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone_number"  // Changed from 'phone' to 'phone_number'
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />

            {formData.genres.length > 0 && (
              <div className="selected-genres">
                <h3>Selected Genres:</h3>
                <ul>
                  {formData.genres.map((genre) => (
                    <li key={genre}>
                      {genre}
                      <button type="button" onClick={() => removeGenre(genre)}>x</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="genre-selection">
              <h3>Choose Your Favorite Genres:</h3>
              {genresOptions.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  disabled={formData.genres.includes(genre)}
                  className="genre-button"
                >
                  {genre} +
                </button>
              ))}
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <div className="help-section">
            <Link to="/signin"><span>Already have an account? </span>Sign-In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
