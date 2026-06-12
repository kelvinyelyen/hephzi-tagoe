'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="app-container">
      <Header />

      {/* Hero: ABOUT label, large name, subtitle — full width */}
      <section className="about-hero">
        <div className="about-hero-label">ABOUT</div>
        <h1 className="about-hero-name">
          Dr. Hephzi Angela Tagoe
        </h1>
        <p className="about-hero-subtitle">
          Skin biologist, science communicator, and founding director of GhScientific.
        </p>
      </section>

      {/* Bio context + Portrait — two column layout */}
      <section className="about-bio-section">
        <div className="about-bio-left">
          <div className="section-pointer" style={{ marginTop: 0 }}>
            <span>→</span> A LITTLE CONTEXT
          </div>

          <div className="about-bio-copy">
            <p>
              I sit at the intersection of molecular research, science communication, and community education. These three are at the core of everything I do. Combining them into a coherent career is a challenging and ongoing endeavour.
            </p>
            <p>
              Titles and disciplines are fickle and fleeting. But my work fits under the umbrellas of skin biology, public engagement, and STEM capacity building. With some creative writing and cultural analysis sprinkled on top.
            </p>
            <p>
              I currently direct public outreach at <a href="https://ghscientific.org" target="_blank" rel="noopener noreferrer" className="editorial-link">GhScientific</a>, designing interactive mobile workshops and mentoring early-career researchers across West Africa and the United Kingdom.
            </p>
            <p>
              Here&rsquo;s what I&rsquo;ve been up to for the last few years:
            </p>
          </div>

          {/* Vertical Career Timeline */}
          <div className="timeline-container">
            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-date">2014 - PRESENT</div>
              <h4 className="timeline-header">
                Founding Director at <a href="https://ghscientific.org" target="_blank" rel="noopener noreferrer">GhScientific</a>
              </h4>
              <p className="timeline-desc">
                Established a non-governmental organization focused on STEM capacity building. We design public mobile labs, run interactive workshops, and have mentored over 10,000 students across West African hubs.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-date">2019 - PRESENT</div>
              <h4 className="timeline-header">
                Winston Churchill Fellow at <strong>Winston Churchill Trust</strong>
              </h4>
              <p className="timeline-desc">
                Awarded a travel fellowship to investigate creative informal science education systems across Finland and Ghana, synthesizing strategies to expand regional &ldquo;science capital&rdquo; in under-resourced schools.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-date">2018 - PRESENT</div>
              <h4 className="timeline-header">
                Pioneer &amp; Director at <strong>Basildon Street Science Festival</strong>
              </h4>
              <p className="timeline-desc">
                Pioneered an annual public outreach festival that moves scientific laboratory experiments directly onto high streets, giving shoppers and local families direct, hands-on scientific exposure.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-date">2017 - 2025</div>
              <h4 className="timeline-header">
                Center Director at <a href="https://townsqlearningcentre.co.uk/" target="_blank" rel="noopener noreferrer">Townsq Learning Centre</a>
              </h4>
              <p className="timeline-desc">
                Founded and led Townsq Learning Centre, directing curriculum design, staff coordination, and delivery models aligned with UK education standards while overseeing organisational development and operational governance.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-date">2016 - 2020</div>
              <h4 className="timeline-header">
                Regional Committee Chair at <strong>Royal Society of Biology</strong>
              </h4>
              <p className="timeline-desc">
                Directed biological science campaigns, led public engagement initiatives, and championed professional career paths for minority and early-career researchers.
              </p>
            </div>
          </div>

          <div className="about-bio-copy">
            <p>
              On the side, I write and speak about <strong className="magenta-highlight">diversity in science</strong>, skin barrier profiling, and designing <strong className="magenta-highlight">creative after-school curriculums</strong> that foster a lifelong curiosity in young minds.
            </p>
          </div>
        </div>

        {/* Right Column: Portrait + Book Card */}
        <div className="about-bio-right">
          <div className="about-right-sticky">
            <div className="about-portrait-frame">
              <img
                src="/profile_pic.jpg"
                alt="Dr. Hephzi Angela Tagoe Portrait"
                className="about-portrait-img"
                draggable="false"
              />
            </div>
            <div className="about-book-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div className="about-book-thumbnail">
                <a href="https://www.amazon.co.uk/SOULFUL-SERENADE-COLLECTION-LOVE-POEMS-ebook/dp/B0D6TZ28K9" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/book1.png"
                    alt="Soulful Serenade Book Cover"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    draggable="false"
                  />
                </a>
              </div>
              <div className="about-book-buttons" style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://www.amazon.co.uk/SOULFUL-SERENADE-COLLECTION-LOVE-POEMS-ebook/dp/B0D6TZ28K9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-book-btn"
                >
                  Amazon
                </a>
                <a
                  href="https://shop.beacons.ai/hephzitagoe/7fce377d-a570-42c4-ae1a-7e0f6df8f2a7?pageViewSource=lib_view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-book-btn"
                >
                  Beacon
                </a>
              </div>
            </div>
            {/* Minimal side: portrait and book thumbnail */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
