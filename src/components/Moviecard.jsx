import React, { useState, useEffect } from "react";
import "./Moviecard.css";

const Moviecard = ({ title = "AVENGERS", genre, poster_url, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = poster_url;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [poster_url]);

  return (
    <div className="card" onClick={onClick}>
      {isLoading ? (
        <div className="shimmer-wrapper">
          <div className="shimmer-image"></div>
        </div>
      ) : (
        <>
          <img className="card-image" src={poster_url} alt="poster" />
          <h3>{title}</h3>
        </>
      )}
    </div>
  );
};

export default Moviecard;
