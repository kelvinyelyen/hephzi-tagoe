'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';

export default function Projects() {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Define contents for each section
  const tabData = {
    bio: {
      category: 'SCIENCE & ADVOCACY',
      heading: 'Bridging Molecular Science and Inclusive STEM Advocacy',
      paragraphs: [
        'Dr. Hephzi Angela Tagoe holds a PhD in skin biology, with an academic foundation built on years of rigorous research in biomedical and pharmaceutical sciences. Her exploration into skin barrier function has fueled a deep scientific curiosity coupled with a dedication to evidence-based scientific discourse.',
        'As a passionate advocate for diversity, she is committed to highlighting the achievements of Black women in STEM. By bridging molecular science with grassroots advocacy, she works to lower systemic barriers in academia and local communities through active mentorship.'
      ],
      accordionItems: [
        { text: 'Molecular Biology of the Skin Barrier: Challenges and Breakthroughs', source: 'Dermatology & Society' },
        { text: 'The Journeys of Black Women in STEM: A Roadmap for Equity and Inclusion', source: 'STEM Diversity Review' },
        { text: 'Mentorship Models for Minority Groups in Modern Science', source: 'Journal of Higher Education' }
      ],
      logo: (
        <div className="flat-switcher-logo-container">
          <span className="flat-switcher-logo-pill">RSB</span>
        </div>
      )
    },
    research: {
      category: 'PUBLICATIONS & DISCOURSE',
      heading: 'Science & Research Publications',
      paragraphs: [
        "Dr. Tagoe's academic portfolio spans rigorous studies in skin biology, public perceptions of science, and comparative educational systems. Her peer-reviewed articles focus on molecular skin mechanisms and the impact of language-specific public health outreach.",
        'Her landmark comparative study of informal education structures in Finland and Ghana, supported by the Winston Churchill Trust, presents actionable frameworks to elevate regional "science capital" in low-income schools.'
      ],
      accordionItems: [
        { text: 'Molecular Profiling of Skin Barrier Function under Pharmaceutical Formulations', source: 'Dermatological Sciences' },
        { text: 'The Origins and Practice of Science Communication in Ghana: Tracing Language Barriers', source: 'Journal of Science Communication (JCOM)' },
        { text: 'Informal STEM Learning Environments: A Comparative Cross-Cultural Analysis', source: 'Winston Churchill Trust Report' }
      ],
      logo: (
        <div className="flat-switcher-logo-container">
          <span className="flat-switcher-logo-badge">CHURCHILL</span>
        </div>
      )
    },
    ghscientific: {
      category: 'STEM CAPACITY BUILDING',
      heading: 'GhScientific — Empowering Communities through STEM',
      paragraphs: [
        'Founded by Dr. Hephzi Angela Tagoe, GhScientific is a registered non-governmental organization dedicated to building capacity in Science, Technology, Engineering, and Mathematics (STEM) within educational and community settings.',
        'The charity designs and implements impactful workshops, science communication training programs, and interactive exhibitions. It has successfully engaged over 100+ scientists and reached over 10,000+ students across global hubs.'
      ],
      accordionItems: [
        { text: 'Expanding Science Capital: Strategic Frameworks for Grassroots Educational Labs', source: 'GhScientific Annual Report' },
        { text: 'Building Bridges: Empowering Local Scientists to Communicate Effectively', source: 'West Africa Science Digest' },
        { text: 'Vibrant STEM Workshops for Underrepresented Youth: A Multi-Year Assessment', source: 'Education & Outreach Quarterly' }
      ],
      logo: (
        <div className="flat-switcher-logo-container">
          <span className="flat-switcher-logo-text">GhScientific</span>
        </div>
      )
    },
    community: {
      category: 'GRASSROOTS ENGAGEMENT',
      heading: 'Community Engagement & Science Festivals',
      paragraphs: [
        'As the pioneer of the Basildon Street Science Festival, Dr. Tagoe transformed the public high street into an open laboratory. The annual event moves experiments out of exclusive labs, giving shoppers and local families direct access to hands-on science.',
        'Her Winston Churchill Fellowship findings are actively applied by UK and Ghanaian schools to optimize after-school programs, integrating creative storytelling and cultural resonance into science education to foster lifelong curiosity.'
      ],
      accordionItems: [
        { text: 'Democratizing Science: Moving Laboratory Experiments to Public High Streets', source: 'Street Science Forum' },
        { text: 'Finland to Ghana: Building Creative After-School Science Narratives', source: 'Churchill Fellowships Archive' },
        { text: 'Engaging Families in STEM: Interactive Street Booth Design and Best Practices', source: 'Journal of Public Outreach' }
      ],
      logo: (
        <div className="flat-switcher-logo-container">
          <span className="flat-switcher-logo-pill">STREET SCIENCE</span>
        </div>
      )
    }
  };

  return (
    <div className="projects-vertical-list">
      {Object.entries(tabData).map(([key, data]) => {
        const isAccordionOpen = !!openAccordions[key];
        return (
          <section key={key} id={key} className="content-wrapper scroll-section">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flat-switcher-container"
            >
              {/* Left Column: Typography Details */}
              <div className="flat-switcher-left">
                <span className="flat-switcher-label">{data.category}</span>
                <h2 className="flat-switcher-heading">{data.heading}</h2>

                <div className="flat-switcher-body">
                  {data.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Accordion Learn More */}
                <div className="accordion-wrapper">
                  <button
                    className="accordion-trigger"
                    onClick={() => toggleAccordion(key)}
                    aria-expanded={isAccordionOpen}
                  >
                    <ChevronDown
                      className={`accordion-icon ${isAccordionOpen ? 'open' : ''}`}
                    />
                    <span>{isAccordionOpen ? 'Learn Less' : 'Learn More'}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isAccordionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="accordion-content"
                      >
                        <ul className="accordion-list">
                          {data.accordionItems.map((item, idx) => (
                            <li key={idx} className="accordion-list-item">
                              {item.text} | <strong>{item.source}</strong>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Plain Image Placeholder & Institution Logo */}
              <div className="flat-switcher-right">
                <div className="flat-switcher-image-container">
                  <div className="flat-placeholder-box">
                    <ImageIcon className="placeholder-icon" />
                  </div>
                </div>
                {data.logo}
              </div>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
