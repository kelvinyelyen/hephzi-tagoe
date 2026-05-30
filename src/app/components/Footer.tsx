'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ width: '100%', marginTop: '3.5rem' }}>
      {/* Cozy Minimalist Two-Column Footer Links */}
      <div className="site-footer">
        {/* Left Column: RSS-style details, socials, copyright */}
        <div className="footer-left-col">
          <h3 className="footer-left-title">Want to collaborate?</h3>
          <p className="footer-left-desc">
            I am always open to consulting on STEM workshops, academic mentorship frameworks, or public biological advocacy programs. Reach out directly at <a href="mailto:info@ghscientific.org">info@ghscientific.org</a>.
          </p>

          {/* Typographic Elegant Newsletter Registration Block */}
          <div className="newsletter-form-container" style={{ width: '100%', maxWidth: '440px', marginBottom: '2.25rem' }}>
            <h4 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.15rem', fontWeight: '500', color: 'var(--primary-color)', marginBottom: '0.4rem' }}>
              Subscribe to the Newsletter
            </h4>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
              Occasional letters on informal science outreach, biological essays, and creative writing updates.
            </p>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert('Thank you for subscribing!'); 
              }} 
              className="newsletter-form"
              style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                borderBottom: '1.5px solid rgba(43, 41, 39, 0.15)', 
                paddingBottom: '0.4rem', 
                width: '100%' 
              }}
            >
              <input 
                type="email" 
                placeholder="your.email@domain.com" 
                required 
                style={{ 
                  flex: '1', 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  fontFamily: "'Lato', sans-serif", 
                  fontSize: '0.9rem', 
                  color: 'var(--primary-color)' 
                }} 
              />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontFamily: "'Lato', sans-serif", 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  letterSpacing: '0.08em', 
                  textTransform: 'uppercase', 
                  color: 'var(--accent-magenta)',
                  padding: '0 0.5rem'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="footer-socials">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>

          <span className="footer-copyright">
            &copy; {currentYear} Dr. Hephzi Angela Tagoe. Built in the spirit of open science.
          </span>
        </div>

        {/* Right Column: Direct Navigation */}
        <div className="footer-right-col">
          <span className="footer-nav-title">Navigating</span>
          <ul className="footer-link-list">
            <li>
              <Link href="/" className="footer-link-item" style={{ textDecoration: 'none' }}>
                About Dr. Hephzi
              </Link>
            </li>
            <li>
              <Link href="/publications" className="footer-link-item" style={{ textDecoration: 'none' }}>
                Selected Publications
              </Link>
            </li>
            <li>
              <Link href="/media" className="footer-link-item" style={{ textDecoration: 'none' }}>
                Media & Talks
              </Link>
            </li>
            <li>
              <a
                href="https://ghscientific.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-item"
                style={{ borderBottom: 'none', color: 'inherit', textDecoration: 'none' }}
              >
                GhScientific Charity
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

