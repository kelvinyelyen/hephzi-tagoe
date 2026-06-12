'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Media', href: '/media' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'GhScientific', href: 'https://ghscientific.com', isExternal: true },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className={`header-navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', position: 'sticky', top: 0 }}
    >
      {/* Brand logo: Image asset from public folder */}
      <Link
        href="/"
        className="header-brand"
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          borderBottom: 'none',
          textDecoration: 'none',
        }}
        aria-label="Dr. Hephzi Home"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <img
          src="/HANAT.png"
          alt="HANAT Logo"
          style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
        />
      </Link>

      {/* Navigation center links (desktop) */}
      <nav className="header-nav">
        {NAV_ITEMS.map((item, index) => {
          const isActive = !item.isExternal && pathname === item.href;
          const linkProps = item.isExternal
            ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: item.href };

          return (
            <Link
              key={index}
              {...linkProps}
              className={`header-nav-link ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu toggle button */}
      <button
        className="header-mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <div className="hamburger-box">
          <span className={`hamburger-inner ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </div>
      </button>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header-mobile-drawer"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="header-mobile-nav">
              {NAV_ITEMS.map((item, index) => {
                const isActive = !item.isExternal && pathname === item.href;
                const linkProps = item.isExternal
                  ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: item.href };

                return (
                  <Link
                    key={index}
                    {...linkProps}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`header-mobile-link ${isActive ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                className="header-mobile-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={16} />
                <span>Close Menu</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
