'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TalksPage() {
  return (
    <main className="app-container">
      <Header />

      {/* Hero Section */}
      <section className="talks-hero" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <h1 className="about-hero-name" style={{ marginBottom: '0.5rem' }}>
          Speaking Engagements
        </h1>
        <p className="about-hero-subtitle">
          Are you looking for a subject knowledge expert for your keynote talk or panel discussion?<br />
          Here are samples of my speaking engagement. Get in touch to discuss requirements and for a quote.
        </p>
      </section>

      {/* List of Engagements */}
      <section className="talks-list" style={{ display: 'grid', gap: '1.2rem' }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li><strong>Nottingham - Festival of Science and Curiosity</strong>: “Doing real science in schools”.</li>
          <li><strong>Kenya – Wellcome International Engagement Workshop</strong>: “Engaging underserved communities”.</li>
          <li><strong>Imperial College London – BBSTEM</strong>: “From industry through academia to business”.</li>
          <li><strong>Ghana – Various</strong></li>
          <li><strong>British Society for Investigative Journalism</strong>: Various.</li>
          <li><strong>Queen Mary University – London Scicomm Symposium</strong>: “Community engagement”.</li>
          <li><strong>University of Birmingham – Public Engagement Symposium</strong>: “Community engagement”.</li>
          <li><strong>University of Warsaw, Poland – Sense About Science</strong>: “Standing up for science”.</li>
          <li><strong>Charles University, Prague – International Biology Olympiad</strong>: “Good practice in education”.</li>
          <li><strong>EU Parliament – Evidence Matters</strong>: “Effective public engagement”.</li>
          <li><strong>Southend Tech Meetup</strong>: “Feeding the biotech pipeline with future skills”.</li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}
