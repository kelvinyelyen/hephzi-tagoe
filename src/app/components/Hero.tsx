'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="home-hero">
      {/* Left: Editorial text */}
      <div className="home-hero-text">
        <h1 className="about-hero-name">
          Dr. Hephzi Angela Tagoe
        </h1>
        <p className="about-hero-subtitle">
          Research scientist, science communicator, and founder of <a href="https://ghscientific.org" target="_blank" rel="noopener noreferrer">GhScientific</a>.
        </p>
      </div>

      {/* Right: Creatively offset portrait */}
      <div className="home-hero-image-wrapper">
        <div className="home-hero-image-frame">
          <img
            src="/profile_photo.JPG"
            alt="Dr. Hephzi Angela Tagoe"
            className="home-hero-img"
            draggable="false"
          />
        </div>
        {/* Decorative accent element behind image */}
        <div className="home-hero-accent-block" aria-hidden="true"></div>
      </div>
    </section>
  );
}
