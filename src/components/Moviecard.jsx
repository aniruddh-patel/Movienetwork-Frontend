import React from 'react';
import './Moviecard.css';

const Moviecard = ({ title, genre, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <h3>{title}</h3>
      <p>{genre}</p>
    </div>
  );
};

export default Moviecard;
