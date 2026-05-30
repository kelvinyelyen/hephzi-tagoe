'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

interface Publication {
  title: string;
  authors: string;
  year: string;
  journal: string;
  link?: string;
  description: string;
}

const PEER_REVIEWED: Publication[] = [
  {
    title: "Molecular barrier profiling of the stratum corneum in ethnic skin: pharmaceutical implications",
    authors: "Tagoe, H. A., et al.",
    year: "2018",
    journal: "Journal of Investigative Dermatology",
    description: "Investigated structural lipid variances and barrier integrity across diverse stratum corneum models. Proposed targeted pharmaceutical formulations tailored to address molecular lipid profile disparities and optimize hydration absorption."
  },
  {
    title: "Pharmaceutical formulations targeting the skin barrier: profiling lipid compositions and barrier integrity",
    authors: "Tagoe, H. A., et al.",
    year: "2016",
    journal: "International Journal of Pharmaceutics",
    description: "Mapped structural lipid pathways using mass spectrometry to discover barrier integrity indicators. Provided a foundation for designing targeted lipid carrier emulsions in skin therapeutics."
  },
  {
    title: "Comparative molecular analysis of mammalian epidermal barrier structures",
    authors: "Tagoe, H. A.",
    year: "2015",
    journal: "Skin Biology & Pharmacology",
    description: "A comprehensive comparative review detailing evolutionary and environmental adaptations in mammalian epidermal tissues, with a focus on trans-epidermal water loss thresholds."
  }
];

const POLICY_REPORTS: Publication[] = [
  {
    title: "Bridging the Gap: Creative Science Narratives for Informal Learning Environments",
    authors: "Tagoe, H. A.",
    year: "2020",
    journal: "Winston Churchill Memorial Trust Fellowship Report",
    description: "Synthesized travel research across Finland and Ghana. Proposed a creative framework for establishing public 'science capital' within community markets, shopping malls, and regional street corners."
  },
  {
    title: "Building STEM Capacity in West Africa: A Decade of Mobile Lab Engagement",
    authors: "Tagoe, H. A., & GhScientific Team",
    year: "2019",
    journal: "West African Journal of Science Education",
    description: "An empirical evaluation of mobile laboratory outreach workshops, demonstrating a 35% increase in high school sciences engagement across target West African municipal hubs."
  }
];

const PUBLIC_ESSAYS: Publication[] = [
  {
    title: "Bringing Science to the High Street: Why Public Space is the Next Laboratory",
    authors: "Tagoe, H. A.",
    year: "2021",
    journal: "Royal Society of Biology Regional Outreach Column",
    description: "Argues for taking academic science out of closed research buildings and placing it directly into shopping spaces, engaging shoppers through street experiments to rebuild public trust in biology."
  },
  {
    title: "Democratizing Molecular Biology: Making Complex Barrier Biochemistry Relatable",
    authors: "Tagoe, H. A.",
    year: "2019",
    journal: "Street Science Publications",
    description: "An instructional essay proposing standard metaphors and simple household models to make skin molecular barrier profiling and biology accessible for primary and secondary school outreach workshops."
  }
];

export default function PublicationsPage() {
  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: '4rem' }}>
      {/* Shared Monogram Header */}
      <Header />

      {/* Main Column: 720px wide layout for readability */}
      <div style={{ maxWidth: '720px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Title Block */}
        <div>
          <h1 className="hero-heading" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
            Selected Publications
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '640px' }}>
            A curated list of my peer-reviewed molecular skin biology research, regional STEM capacity building reports, and public science advocacy writing.
          </p>
        </div>

        {/* Section 1: Peer-Reviewed Scientific Papers */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="section-pointer">
            <span>→</span> 01. Peer-Reviewed Papers
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {PEER_REVIEWED.map((pub, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="timeline-header" style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: '1.4' }}>
                  <span className="editorial-link" style={{ borderBottomColor: 'rgba(196, 38, 98, 0.15)', cursor: 'default' }}>
                    {pub.title}
                  </span>
                </h3>
                
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                  <span>{pub.authors}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.journal}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.year}</span>
                </div>

                <p className="timeline-desc" style={{ marginTop: '0.25rem' }}>
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Policy & Outreach Reports */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="section-pointer">
            <span>→</span> 02. Academic Reports & Policy
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {POLICY_REPORTS.map((pub, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="timeline-header" style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: '1.4' }}>
                  <span className="editorial-link" style={{ borderBottomColor: 'rgba(196, 38, 98, 0.15)', cursor: 'default' }}>
                    {pub.title}
                  </span>
                </h3>
                
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                  <span>{pub.authors}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.journal}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.year}</span>
                </div>

                <p className="timeline-desc" style={{ marginTop: '0.25rem' }}>
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Selected Essays & Columns */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '2rem' }}>
          <div className="section-pointer">
            <span>→</span> 03. Selected Essays & Columns
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {PUBLIC_ESSAYS.map((pub, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="timeline-header" style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: '1.4' }}>
                  <span className="editorial-link" style={{ borderBottomColor: 'rgba(196, 38, 98, 0.15)', cursor: 'default' }}>
                    {pub.title}
                  </span>
                </h3>
                
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                  <span>{pub.authors}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.journal}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>•</span>
                  <span>{pub.year}</span>
                </div>

                <p className="timeline-desc" style={{ marginTop: '0.25rem' }}>
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
