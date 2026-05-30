

export default function Hero() {
  return (
    <section id="bio" className="hero-section scroll-section">
      {/* Left Column: Huge Name, Editorial Copy, Timeline, and Backstory */}
      <div className="hero-content">
        {/* Name and Subtitle */}
        <h1 className="hero-heading">Dr. Hephzi Angela Tagoe</h1>
        <h2 className="hero-subtitle">
          Research scientist, science communicator, and founder of GhScientific.
        </h2>

        {/* Context Bio Text */}
        <div className="hero-bio-text">
          <p>
            I sit at the intersection of molecular research, science communication, and community education. I believe that knowledge does not belong behind closed doors—science is most powerful when it moves out of exclusive facilities and onto public high streets.
          </p>
          <p>
            For over a decade, my work has focused on building regional capacity, bridging gaps between academic institutions and local communities, and advocating for diversity and inclusion as a regional chair at the <strong className="magenta-highlight">Royal Society of Biology</strong>.
          </p>
          <p>
            Currently, I direct public outreach at <a href="#contact" className="editorial-link">GhScientific</a>, designing interactive mobile workshops and mentoring early-career researchers across West Africa and the United Kingdom.
          </p>
          <p>
            Here is a timeline of what I have been up to for the last few years:
          </p>
        </div>

        {/* Maggie Appleton Style Vertical Career Timeline */}
        <div className="timeline-container">
          <div className="timeline-line"></div>

          {/* GhScientific Node */}
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

          {/* Churchill Node */}
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

          {/* Basildon Node */}
          <div className="timeline-item">
            <div className="timeline-node"></div>
            <div className="timeline-date">2018 - PRESENT</div>
            <h4 className="timeline-header">
              Pioneer & Director at <strong>Basildon Street Science Festival</strong>
            </h4>
            <p className="timeline-desc">
              Pioneered an annual public outreach festival that moves scientific laboratory experiments directly onto high streets, giving shoppers and local families direct, hands-on scientific exposure.
            </p>
          </div>

          {/* Townsq Learning Centre Node */}
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

          {/* RSB Node */}
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


        {/* Context Bio Footer Highlights */}
        <div className="hero-bio-text">
          <p>
            On the side, I write and speak about <strong className="magenta-highlight">diversity in science</strong>, skin barrier profiling, and designing <strong className="magenta-highlight">creative after-school curriculums</strong> that foster a lifelong curiosity in young minds.
          </p>
        </div>
      </div>

      {/* Right Column: One Strong Vertical Portrait Photo & Book Showcase Card */}
      <div className="hero-images-container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div className="hero-portrait-frame">
          <img
            src="/profile_pic.jpg"
            className="hero-portrait-img"
            alt="Dr. Hephzi Angela Tagoe Portrait"
          />
        </div>

        {/* Featured Book Showcase Card (Moved here to perfectly balance the right column) */}
        <div className="featured-book-card">
          {/* Book Cover Frame */}
          <div className="book-cover-frame">
            <img 
              src="/book.jpg" 
              alt="Soulful Serenade Book Cover" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              draggable="false"
            />
          </div>

          {/* Book Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: '1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-magenta)' }}></span>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>New Poetry Release</span>
            </div>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.25rem', fontWeight: '500', color: 'var(--primary-color)', margin: '0.15rem 0', lineHeight: '1.3' }}>
              Soulful Serenade: A Collection of Love Poems
            </h3>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              By Dr. Hephzi Angela Tagoe
            </span>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: '0.2rem 0 0.8rem 0' }}>
              A beautifully reflective anthology exploring love, connection, and emotional landscapes.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', width: '100%' }}>
              <a 
                href="https://www.amazon.co.uk/SOULFUL-SERENADE-COLLECTION-LOVE-POEMS-ebook/dp/B0D6TZ28K9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="slider-watch-btn"
                style={{ fontSize: '0.68rem', padding: '0.45rem 1rem', flex: '1', textAlign: 'center' }}
              >
                Amazon
              </a>
              <a 
                href="https://shop.beacons.ai/hephzitagoe/7fce377d-a570-42c4-ae1a-7e0f6df8f2a7?pageViewSource=lib_view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="slider-watch-btn"
                style={{ 
                  fontSize: '0.68rem', 
                  padding: '0.45rem 1rem', 
                  backgroundColor: 'transparent', 
                  color: 'var(--primary-color)', 
                  border: '1.5px solid rgba(43, 41, 39, 0.15)',
                  flex: '1',
                  textAlign: 'center'
                }}
              >
                Beacons
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
