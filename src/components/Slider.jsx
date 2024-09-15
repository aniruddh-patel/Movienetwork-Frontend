import React, { useRef, useEffect, useState } from "react";
import "./Slider.css";
import Moviecard from "./Moviecard";
import { useNavigate } from "react-router-dom";

const Slider = ({ movies, startDelay = 1000 }) => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const duplicatedMovies = [...movies, ...movies];

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrameId;

    const startScrolling = () => {
      const animateScroll = () => {
        if (!isPaused) {
          slider.scrollBy({ left: 1, behavior: "auto" });

          if (slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0;
          }
        }
        animationFrameId = requestAnimationFrame(animateScroll);
      };

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    const timeoutId = setTimeout(startScrolling, startDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, startDelay]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const scrollLeft = () => {
    setIsPaused(true);
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(() => setIsPaused(false), 600);
  };

  const scrollRight = () => {
    setIsPaused(true);
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(() => setIsPaused(false), 600);
  };

  const handleMovieClick = (movie_id) => {
    navigate(`/movieinfo/${movie_id}`);
  };

  return (
    <div className="slider-container">
      <button className="scroll-button left" onClick={scrollLeft}>
        ‹
      </button>
      <div
        className="slider"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="slider-wrapper">
          {duplicatedMovies.map((movie, index) => (
            <Moviecard
              key={`${movie.movie_id}-${index}`}
              title={movie.title}
              genre={movie.genre}
              poster_url={movie.poster_url}
              onClick={() => handleMovieClick(movie.movie_id)}
            />
          ))}
        </div>
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
        ›
      </button>
    </div>
  );
};

export default Slider;
