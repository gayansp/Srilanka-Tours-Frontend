import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const slides = [
  { image: '/public/images/5mk.jpg', tag: '#1 Safari Experience in Sri Lanka' },
  { image: '/public/images/68.jpg', tag: 'Explore Ancient Wonders' },
  { image: '/public/images/koo.jpg', tag: 'Pristine Beaches Await' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide — 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          {slides[current].tag}
        </div>

        <h1 className="hero-title">
          Discover the Wild
          <span className="hero-accent"> Heart of Sri Lanka</span>
        </h1>

        <p className="hero-desc">
          Experience unforgettable adventures across Sri Lanka's most breathtaking
          destinations. Ancient temples, pristine beaches, lush highlands — we make
          every journey unforgettable.
        </p>

        <div className="hero-btns">
          <Link to="/contact" className="hero-btn-primary">🧮 Calculate Trip Cost</Link>
          <Link to="/tours"   className="hero-btn-secondary">🌍 Explore Packages</Link>
        </div>

        <div className="hero-bottom">
          <div className="hero-travelers">
            <div className="traveler-avatars">
              <img src="/images/av1.jpg" alt="" />
              <img src="/images/av2.jpg" alt="" />
              <img src="/images/av3.jpg" alt="" />
            </div>
            <span>2,500+ Happy Travelers</span>
          </div>
          <div className="hero-rating">
            <span className="stars">★★★★★</span>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
