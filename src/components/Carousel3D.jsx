import React, { useEffect } from 'react';
import slide1 from '../images/content/banner1.jpeg'
import slide2 from '../images/content/banner2.jpg'
import slide3 from '../images/content/banner3.jpg'
import slide4 from '../images/content/banner4.jpg'
import slide5 from '../images/content/banner5.png'
import slide6 from '../images/content/banner6.png'
import slide7 from '../images/content/banner7.png'
import slide8 from '../images/content/banner8.jpg'
import './Carousel.css';

const slides = [
  { id: 1, image: slide1 },
  { id: 2, image: slide2 },
  { id: 3, image: slide3 },
  { id: 4, image: slide4 },
  { id: 5, image: slide5 },
  { id: 6, image: slide6 },
  { id: 7, image: slide7 },
  { id: 8, image: slide8 },
];

const Carousel3D = () => {
  useEffect(() => {
    const carousel = document.querySelector('.carousel');
    let angle = 0;
    let interval;

    const startCarousel = () => {
      interval = setInterval(() => {
        angle -= 45;
        carousel.style.transform = `rotateY(${angle}deg)`;
      }, 3000);
    };

    const stopCarousel = () => {
      clearInterval(interval);
    };

    // Start carousel initially
    startCarousel();

    // Handle visibility change to pause/resume the carousel
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopCarousel(); // Stop when tab is inactive
      } else if (document.visibilityState === 'visible') {
        startCarousel(); // Resume when tab is active
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="container">
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slide"
            style={{ backgroundImage: `url(${slide.image})`, transform: `rotateY(${index * 45}deg) translateZ(620px)` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
