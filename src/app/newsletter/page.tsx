'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  date: string;
  content: string;
  readTime: string;
}

const DEFAULT_NEWSLETTERS: Newsletter[] = [
  {
    id: '1',
    title: "Reframing Outreach: Mobile Science Labs in Action",
    subject: "Reflections on designing informal STEM curriculums in Basildon and Ghana.",
    date: "June 2, 2026",
    readTime: "4 min read",
    content: "Informal science education is often treated as a luxury. An after-school club, a weekend museum trip, or a holiday camp. But for under-resourced schools, it is the only exposure students get to hands-on experimentation. Over the last decade at GhScientific, we've focused on taking science directly to where children are.\n\nInstead of asking students to travel to university campuses, we pack portable microscopes, pH sensors, and DNA modeling kits into custom mobile boxes. Our first experiment on high streets in Basildon taught us that children are naturally curious—they don't need a formal lab setting to ask brilliant questions.\n\nIn this newsletter, I outline the design principles behind our regional STEM capacity outreach: building local scientific trust, moving experiments into public spaces, and mentoring young scientists to teach their peers."
  },
  {
    id: '2',
    title: "The Skin Barrier: Biology Meets Culture",
    subject: "Deep-diving into molecular skin layers and public science misconceptions.",
    date: "May 15, 2026",
    readTime: "5 min read",
    content: "Our skin is a living shield. Structurally, the stratum corneum—the outermost layer of the epidermis—acts as a barrier that keeps water in and environmental toxins out. But skin biology is also deeply social. It sits at the intersection of public health, beauty standards, and cosmetic science.\n\nIn my research, I focus on skin barrier profiling and understanding how common skincare routines affect the skin's molecular equilibrium. Far too often, public health guidelines fail to address the specific needs of diverse skin types.\n\nThis issue explores the biological mechanisms behind barrier repair, the molecular impact of chemical exfoliants, and how we can translate complex dermatological studies into accessible public science education."
  },
  {
    id: '3',
    title: "Churchill Fellowship Travels: Lessons from Finland",
    subject: "How one of the world's best school systems approaches scientific literacy.",
    date: "April 20, 2026",
    readTime: "6 min read",
    content: "During my Winston Churchill Fellowship travels, I spent several weeks exploring Finland's informal science education network. Their approach to science literacy is fundamentally cooperative. Children are encouraged to experiment and fail from an early age, without the pressure of standardized testing.\n\nWhat makes their system so successful is 'science capital'—the idea that science is not just a school subject, but a tool for everyday decision-making. By integrating hands-on biological studies with outdoor activities, Finnish schools foster a deep environmental awareness in their pupils.\n\nIn this post, I reflect on the key findings from my fellowship and discuss how we can adapt these methods to build localized, creative learning centers in the UK and West Africa."
  }
];

export default function NewsletterArchivePage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>(DEFAULT_NEWSLETTERS);
  const [selectedIssue, setSelectedIssue] = useState<Newsletter | null>(null);
  const [modalContent, setModalContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedIssue) {
      let rawContent = selectedIssue.content;
      const hasHtml = /<[a-z][\s\S]*>/i.test(rawContent);
      if (!hasHtml) {
        rawContent = rawContent.split('\n\n').map(p => `<p style="margin-bottom: 1.5rem;">${p}</p>`).join('');
      }
      import('dompurify').then((module) => {
        const DOMPurify = module.default;
        setModalContent(DOMPurify.sanitize(rawContent));
      });
    } else {
      setModalContent('');
    }
  }, [selectedIssue]);

  useEffect(() => {
    async function loadNewsletters() {
      let serverNewsletters: Newsletter[] = [];
      try {
        const response = await fetch('/api/newsletters');
        if (response.ok) {
          const data = await response.json();
          serverNewsletters = data.newsletters || [];
        }
      } catch (e) {
        console.error("Failed to load server newsletters", e);
      }

      // Check localStorage for fallback/local additions
      const stored = localStorage.getItem('dr_hephzi_newsletters');
      let localNewsletters: Newsletter[] = [];
      if (stored) {
        try {
          localNewsletters = JSON.parse(stored) as Newsletter[];
        } catch (e) {}
      }

      // Combine unique newsletters by ID
      const allNewslettersMap = new Map<string, Newsletter>();
      serverNewsletters.forEach(item => allNewslettersMap.set(item.id, item));
      localNewsletters.forEach(item => {
        if (!allNewslettersMap.has(item.id)) {
          allNewslettersMap.set(item.id, item);
        }
      });

      const combined = Array.from(allNewslettersMap.values());
      setNewsletters([...combined, ...DEFAULT_NEWSLETTERS]);
    }
    loadNewsletters();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // 1. Post subscriber to server storage
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // 2. Save subscriber to localStorage (local device list)
      const stored = localStorage.getItem('dr_hephzi_subscribers');
      let subscribers: string[] = [];
      if (stored) {
        try {
          subscribers = JSON.parse(stored);
        } catch (err) {}
      }

      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('dr_hephzi_subscribers', JSON.stringify(subscribers));
      }

      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error("Failed to subscribe", error);
    }
  };

  // Filter and group
  const filteredNewsletters = newsletters.filter(item => {
    const query = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  const isSearching = searchTerm.trim() !== '';
  const featuredIssues = isSearching ? [] : filteredNewsletters.slice(0, 3);
  const listIssues = isSearching ? filteredNewsletters : filteredNewsletters.slice(3);

  const groupIssuesByYear = (issues: Newsletter[]) => {
    const groups: { [year: string]: Newsletter[] } = {};
    issues.forEach(issue => {
      const match = issue.date.match(/\b\d{4}\b/);
      const year = match ? match[0] : new Date().getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(issue);
    });
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .reduce((acc, year) => {
        acc[year] = groups[year];
        return acc;
      }, {} as { [year: string]: Newsletter[] });
  };

  const groupedIssues = groupIssuesByYear(listIssues);

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      <Header />

      {/* Header section */}
      <section className="newsletter-hero">
        <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>
          Letters & essays
        </h1>
        <p className="about-hero-subtitle">
          Occasional thoughts on skin biology, science communication outreach, basildon street science, and black women representation in academia.
        </p>
      </section>

      {/* Subscribe box */}
      <section className="newsletter-subscribe-card">
        {isSubscribed ? (
          <div className="subscribe-success-container">
            <div className="subscribe-success-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 className="subscribe-success-title">Welcome to the Network</h4>
            <p className="subscribe-success-message">
              Thank you! You have successfully subscribed to Dr. Hephzi's updates. Occasional thoughts on skin biology, science communication outreach, and representation will be sent directly to your inbox.
            </p>
            <button onClick={() => setIsSubscribed(false)} className="subscribe-another-btn">
              Subscribe another email
            </button>
          </div>
        ) : (
          <>
            <h3 className="subscribe-card-title">Subscribe to the mailing list</h3>
            <p className="subscribe-card-desc">
              Get direct, beautiful and minimal updates delivered directly to your inbox. No spam, just deep scientific reflections and educational templates.
            </p>
            <form onSubmit={handleSubscribe} className="subscribe-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                className="subscribe-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-submit-btn">
                Subscribe
              </button>
            </form>
          </>
        )}
      </section>

      {/* Archive Grid */}
      <section className="newsletter-archive-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-pointer" style={{ marginBottom: '1rem' }}>
          <span>→</span> ISSUE ARCHIVE
        </div>

        <div className="newsletter-search-container">
          <input
            type="text"
            placeholder="Search archive by title, subject, or keywords..."
            className="newsletter-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {newsletters.length === 0 ? (
          <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: 'var(--text-muted)' }}>No newsletters published yet.</p>
        ) : filteredNewsletters.length === 0 ? (
          <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: 'var(--text-muted)', fontStyle: 'italic' }}>No newsletters match your search.</p>
        ) : (
          <>
            {/* Featured Recent Section */}
            {!isSearching && featuredIssues.length > 0 && (
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ 
                  fontFamily: "'Canela Text', 'Canela', Georgia, serif", 
                  fontSize: '1.25rem', 
                  fontWeight: 400, 
                  color: 'var(--primary-color)',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.02em'
                }}>
                  Recent Letters
                </h3>
                <div className="newsletter-grid">
                  {featuredIssues.map((item) => (
                    <div
                      key={item.id}
                      className="newsletter-item"
                      onClick={() => setSelectedIssue(item)}
                    >
                      <span className="newsletter-item-meta">{item.date} &bull; {item.readTime}</span>
                      <h3 className="newsletter-item-title">{item.title}</h3>
                      <p className="newsletter-item-snippet">
                        {item.subject}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Archive Directory */}
            <div>
              <h3 style={{ 
                fontFamily: "'Canela Text', 'Canela', Georgia, serif", 
                fontSize: '1.25rem', 
                fontWeight: 400, 
                color: 'var(--primary-color)',
                marginBottom: '1rem',
                letterSpacing: '0.02em'
              }}>
                {isSearching ? 'Search Results' : 'Historical Index'}
              </h3>
              
              {Object.keys(groupedIssues).map(year => (
                <div key={year} className="archive-year-group">
                  <h4 className="archive-year-title">{year}</h4>
                  <div className="archive-list-container">
                    {groupedIssues[year].map((item) => (
                      <div
                        key={item.id}
                        className="archive-row-item"
                        onClick={() => setSelectedIssue(item)}
                      >
                        <span className="archive-row-date">{item.date}</span>
                        <h5 className="archive-row-title">{item.title}</h5>
                        <p className="archive-row-subject">{item.subject}</p>
                        <span className="archive-row-arrow">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Modal overlay reader */}
      {selectedIssue && (
        <div className="newsletter-modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div className="newsletter-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="newsletter-modal-close"
              onClick={() => setSelectedIssue(null)}
              aria-label="Close reader"
            >
              &times;
            </button>

            <div className="newsletter-modal-header">
              <span className="newsletter-item-meta" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Published on {selectedIssue.date} &bull; {selectedIssue.readTime}
              </span>
              <h2 className="newsletter-modal-title">{selectedIssue.title}</h2>
              <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
                Subject: {selectedIssue.subject}
              </p>
            </div>

            <div 
              className="newsletter-modal-body"
              dangerouslySetInnerHTML={{ __html: modalContent }}
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
