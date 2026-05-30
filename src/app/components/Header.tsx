'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/' },
  { label: 'Publications', href: '/publications' },
  { label: 'Media', href: '/media' },
  { label: 'GhScientific', href: 'https://ghscientific.com', isExternal: true },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="header-navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 0',
        width: '100%',
        backgroundColor: 'transparent',
        borderBottom: 'none',
        marginBottom: '4rem',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brand logo: Elegant Monogram with Teal arrows */}
      <Link
        href="/"
        className="header-brand"
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '1.45rem',
          fontWeight: 400,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          borderBottom: 'none',
          textDecoration: 'none',
        }}
      >
        <span style={{ color: 'var(--accent-teal)', fontStyle: 'italic', fontWeight: 600 }}>←</span>
        <span style={{ color: 'var(--primary-color)', fontStyle: 'italic' }}>H</span>
        <span style={{ color: 'var(--accent-teal)', fontStyle: 'italic', fontWeight: 600 }}>→</span>
      </Link>

      {/* Navigation center links (desktop) */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = !item.isExternal && pathname === item.href;
          const linkProps = item.isExternal
            ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: item.href };

          return (
            <Link
              key={index}
              {...linkProps}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                color: isActive ? 'var(--accent-magenta)' : 'var(--text-muted)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderBottom: isActive ? '1.5px solid var(--accent-magenta)' : '1.5px solid transparent',
                paddingBottom: '0.2rem',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}

