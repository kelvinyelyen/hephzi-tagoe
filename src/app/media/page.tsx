'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoClip {
  title: string;
  host: string;
  image: string;
  buttonLabel: string;
  youtubeId: string;
}


interface SpeakingEngagement {
  location: string;
  host: string;
  topic: string;
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    title: "Dr Hephzi Tagoe | What bioscience skills are needed?",
    host: "Royal Society of Biology",
    image: "https://i.ytimg.com/vi/cCnu2iB9B0M/hqdefault.jpg",
    buttonLabel: "Watch",
    youtubeId: "cCnu2iB9B0M"
  },
  {
    title: "The Future of Biomedical Engineering with Dr. Hephzi Tagoe",
    host: "Gheek Media",
    image: "https://i.ytimg.com/vi/VhXublmWOVk/hqdefault.jpg",
    buttonLabel: "Watch",
    youtubeId: "VhXublmWOVk"
  },
  {
    title: "The work that gave birth to Gheekmedia",
    host: "Gheek Media",
    image: "https://i.ytimg.com/vi/2aa6USQZlCM/hqdefault.jpg",
    buttonLabel: "Watch",
    youtubeId: "2aa6USQZlCM"
  },
  {
    title: "Skin Biology with Dr Hephzi Tagoe",
    host: "Dr Hanat",
    image: "https://i.ytimg.com/vi/-erz54CIpPA/hqdefault.jpg",
    buttonLabel: "Watch",
    youtubeId: "-erz54CIpPA"
  }
];

const SPEAKING_ENGAGEMENTS: SpeakingEngagement[] = [
  {
    location: "EU Parliament",
    host: "Evidence Matters",
    topic: "Effective public engagement and translating biology findings"
  },
  {
    location: "Imperial College London",
    host: "BBSTEM",
    topic: "From industry through academia to business"
  },
  {
    location: "Kenya",
    host: "Wellcome International Engagement Workshop",
    topic: "Engaging underserved communities in health research"
  },
  {
    location: "University of Warsaw, Poland",
    host: "Sense About Science",
    topic: "Standing up for science"
  },
  {
    location: "Charles University, Prague",
    host: "International Biology Olympiad",
    topic: "Good practice in education"
  },
  {
    location: "Nottingham, UK",
    host: "Festival of Science and Curiosity",
    topic: "Doing real science in schools"
  },
  {
    location: "Queen Mary University, London",
    host: "London SciComm Symposium",
    topic: "Community engagement"
  },
  {
    location: "University of Birmingham, UK",
    host: "Public Engagement Symposium",
    topic: "Community engagement"
  },
  {
    location: "Southend, UK",
    host: "Southend Tech Meetup",
    topic: "Feeding the biotech pipeline with future skills"
  },
  {
    location: "British Society for Investigative Journalism",
    host: "Various Panels",
    topic: "Various technical biology panels"
  },
  {
    location: "Ghana",
    host: "Various Forums",
    topic: "Grassroots STEM capacity building and public workshops"
  }
];


export default function MediaPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  // Track if a drag occurred to prevent accidental watch modal triggers
  const [dragged, setDragged] = useState(false);
  const mouseDownCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedVideoId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideoId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setDragged(false);
    mouseDownCoords.current = { x: e.clientX, y: e.clientY };
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity/speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;

    // Declare a drag if mouse moved more than 5px
    if (Math.abs(e.clientX - mouseDownCoords.current.x) > 5 || Math.abs(e.clientY - mouseDownCoords.current.y) > 5) {
      setDragged(true);
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 372; // Card width (340px) + gap (32px)
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      {/* Shared Monogram Header */}
      <Header />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '2rem' }}>
        {/* Title Block: Confined to 720px to prevent long text line lengths */}
        <div style={{ maxWidth: '720px', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h1 className="hero-heading" style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>
          Media & Public Engagement
        </h1>
        <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
          TEDx speeches, guest podcasts, and press spotlights documenting my public outreach, Churchill Fellowship travels, and street science initiatives.
        </p>
      </div>

      {/* Section 1: VIDEO CLIPS & INTERVIEWS (Expanded to match Header margins - 1100px parent) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <div className="section-pointer">
          <span>→</span> VIDEO CLIPS & INTERVIEWS
        </div>

        <div 
          ref={sliderRef}
          className="media-slider-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClickCapture={handleClickCapture}
          style={{
            cursor: isDown ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          {VIDEO_CLIPS.map((clip, idx) => (
            <div key={idx} className="media-slider-card">
              <div 
                className="slider-image-frame" 
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedVideoId(clip.youtubeId)}
              >
                <img
                  src={clip.image}
                  alt={clip.title}
                  className="slider-image"
                  draggable="false"
                  style={{ pointerEvents: 'none' }}
                />
              </div>
              <h3 className="slider-card-title">
                {clip.title}
              </h3>
              <span className="slider-card-subtitle">
                {clip.host}
              </span>
              <button 
                className="slider-watch-btn"
                onClick={() => setSelectedVideoId(clip.youtubeId)}
              >
                {clip.buttonLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Elegant Slider Navigation Controls */}
        <div className="slider-arrow-container">
          <button 
            onClick={() => scroll('left')}
            className="slider-arrow-btn"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="slider-arrow-btn"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* Section 2: SPEAKING ENGAGEMENTS */}
      <section className="speaking-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <div className="section-pointer">
          <span>→</span> SPEAKING ENGAGEMENTS
        </div>

        <div style={{ maxWidth: '720px', width: '100%', marginBottom: '1.5rem' }}>
          <h3 className="hero-subtitle" style={{ fontSize: '1.45rem', fontStyle: 'normal', color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
            Are you looking for a subject knowledge expert for your keynote talk or panel discussion?
          </h3>
          <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Here are select samples of my speaking engagements. Get in touch to discuss requirements and request a booking quote.
          </p>
        </div>

        <div className="speaking-grid">
          {SPEAKING_ENGAGEMENTS.map((event, idx) => (
            <div key={idx} className="speaking-item">
              <h4 className="speaking-item-title">{event.topic}</h4>
              <p className="speaking-item-host">{event.host}</p>
              <div className="speaking-item-meta">
                <span>Talk</span>
                <span>
                  <span className="speaking-item-meta-separator">&nbsp;&bull;&nbsp;</span>
                  {event.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      </div>

      {/* Shared Footer */}
      <Footer />

      {/* Video Overlay Modal */}
      {selectedVideoId && (
        <div 
          onClick={() => setSelectedVideoId(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 29, 55, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '840px',
              aspectRatio: '16/9',
              backgroundColor: '#000000',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideoId(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              aria-label="Close video"
              className="video-close-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Embedded YouTube Player */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
}
