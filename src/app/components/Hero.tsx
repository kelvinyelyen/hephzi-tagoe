'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  // Staggered loading variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="home-hero">
      {/* Left: Editorial text */}
      <motion.div
        className="home-hero-text"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-pre-title" variants={itemVariants}>
          Researcher &bull; Communicator &bull; Founder
        </motion.span>

        <motion.h1 className="about-hero-name" variants={itemVariants} style={{ lineHeight: '1.08', marginBottom: '1rem' }}>
          Dr. Hephzi Angela Tagoe
        </motion.h1>

        <motion.p className="about-hero-subtitle" variants={itemVariants} style={{ marginBottom: '1rem' }}>
          Research scientist, science communicator, and founding director of <a href="https://ghscientific.org" target="_blank" rel="noopener noreferrer" className="editorial-link">GhScientific</a>. Building bridges between scientific discovery, education, and community capacity.
        </motion.p>

        <motion.div className="hero-cta-group" variants={itemVariants}>
          <Link href="/about" className="hero-cta-primary" style={{ textDecoration: 'none' }}>
            Explore Bio
          </Link>
          <Link href="/publications" className="hero-cta-secondary" style={{ textDecoration: 'none' }}>
            Publications
          </Link>
        </motion.div>
      </motion.div>

      {/* Right: Creatively offset portrait with floating elements */}
      <motion.div
        className="home-hero-image-wrapper"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
      >
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
      </motion.div>
    </section>
  );
}
