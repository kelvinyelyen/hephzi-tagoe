'use client';

import { motion } from 'framer-motion';

export type TabKey = 'bio' | 'research' | 'ghscientific' | 'community' | 'contact';

interface TabOption {
  key: TabKey;
  label: string;
}

interface BioTabsProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

const TABS: TabOption[] = [
  { key: 'bio', label: 'Bio' },
  { key: 'research', label: 'Research' },
  { key: 'ghscientific', label: 'GhScientific' },
  { key: 'community', label: 'Community' },
  { key: 'contact', label: 'Contact' },
];

export default function BioTabs({ activeTab, onTabChange }: BioTabsProps) {
  return (
    <div className="floating-nav-container">
      <motion.nav 
        className="floating-nav-pill"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 0.8 }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`nav-tab-button ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="active-bg-pill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
