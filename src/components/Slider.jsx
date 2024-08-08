import React, { useRef, useEffect, useState } from 'react';
import './Slider.css';
import Moviecard from './Moviecard';

const Slider = ({ startDelay }) => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const cards = [
    { title: 'Card 1', description: 'This is the first card.' },
    { title: 'Card 2', description: 'This is the second card.' },
    { title: 'Card 3', description: 'This is the third card.' },
    { title: 'Card 4', description: 'This is the fourth card.' },
    { title: 'Card 5', description: 'This is the fifth card.' },
    { title: 'Card 6', description: 'This is the sixth card.' },
    { title: 'Card 7', description: 'This is the seventh card.' },
    { title: 'Card 8', description: 'This is the eighth card.' },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrameId;

    const startScrolling = () => {
      const animateScroll = () => {
        if (!isPaused) {
          slider.scrollBy({ left: 1, behavior: 'auto' });

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
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(() => setIsPaused(false), 600);
  };

  const scrollRight = () => {
    setIsPaused(true);
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(() => setIsPaused(false), 600);
  };

  // Handle touch start event
  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
    setIsPaused(true); // Pause scrolling when user starts to touch
  };

  // Handle touch move event
  const handleTouchMove = (event) => {
    if (touchStartX !== null) {
      const touchEndX = event.touches[0].clientX;
      const distance = touchStartX - touchEndX;

      sliderRef.current.scrollBy({ left: distance, behavior: 'auto' });
      setTouchStartX(touchEndX);
    }
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setTouchStartX(null);
    setIsPaused(false); // Resume scrolling after touch ends
  };

  return (
    <div className="slider-container">
      <button className="scroll-button left" onClick={scrollLeft}>‹</button>
      <div
        className="slider"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-wrapper">
          {cards.concat(cards).map((card, index) => (
            <Moviecard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <button className="scroll-button right" onClick={scrollRight}>›</button>
    </div>
  );
};

export default Slider;
