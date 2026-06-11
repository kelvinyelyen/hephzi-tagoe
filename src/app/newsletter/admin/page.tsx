'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Users, FileText, Send, Eye, Lock, LogOut, Copy, Check } from 'lucide-react';

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  date: string;
  content: string;
  readTime: string;
}

const DEFAULT_NEWSLETTERS = [
  {
    id: '1',
    title: "Reframing Outreach: Mobile Science Labs in Action",
    subject: "Reflections on designing informal STEM curriculums in Basildon and Ghana.",
    date: "June 2, 2026",
    content: "Informal science education is often treated as a luxury. An after-school club, a weekend museum trip, or a holiday camp. But for under-resourced schools, it is the only exposure students get to hands-on experimentation. Over the last decade at GhScientific, we've focused on taking science directly to where children are.\n\nInstead of asking students to travel to university campuses, we pack portable microscopes, pH sensors, and DNA modeling kits into custom mobile boxes. Our first experiment on high streets in Basildon taught us that children are naturally curious—they don't need a formal lab setting to ask brilliant questions.\n\nIn this newsletter, I outline the design principles behind our regional STEM capacity outreach: building local scientific trust, moving experiments into public spaces, and mentoring young scientists to teach their peers.",
    readTime: "4 min read"
  },
  {
    id: '2',
    title: "The Skin Barrier: Biology Meets Culture",
    subject: "Deep-diving into molecular skin layers and public science misconceptions.",
    date: "May 15, 2026",
    content: "Our skin is a living shield. Structurally, the stratum corneum—the outermost layer of the epidermis—acts as a barrier that keeps water in and environmental toxins out. But skin biology is also deeply social. It sits at the intersection of public health, beauty standards, and cosmetic science.\n\nIn my research, I focus on skin barrier profiling and understanding how common skincare routines affect the skin's molecular equilibrium. Far too often, public health guidelines fail to address the specific needs of diverse skin types.\n\nThis issue explores the biological mechanisms behind barrier repair, the molecular impact of chemical exfoliants, and how we can translate complex dermatological studies into accessible public science education.",
    readTime: "5 min read"
  },
  {
    id: '3',
    title: "Churchill Fellowship Travels: Lessons from Finland",
    subject: "How one of the world's best school systems approaches scientific literacy.",
    date: "April 20, 2026",
    content: "During my Winston Churchill Fellowship travels, I spent several weeks exploring Finland's informal science education network. Their approach to science literacy is fundamentally cooperative. Children are encouraged to experiment and fail from an early age, without the pressure of standardized testing.\n\nWhat makes their system so successful is 'science capital'—the idea that science is not just a school subject, but a tool for everyday decision-making. By integrating hands-on biological studies with outdoor activities, Finnish schools foster a deep environmental awareness in their pupils.\n\nIn this post, I reflect on the key findings from my fellowship and discuss how we can adapt these methods to build localized, creative learning centers in the UK and West Africa.",
    readTime: "6 min read"
  }
];

export default function NewsletterAdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // CMS States
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [resendConfigured, setResendConfigured] = useState(false);
  const [customNewsletters, setCustomNewsletters] = useState<Newsletter[]>([]);
  
  // Form States
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  
  // Navigation & Workspace states
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'issues'>('write');
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'warning' | ''>('');

  // Editor states & refs
  const editorRef = useRef<HTMLDivElement>(null);
  const [previewContent, setPreviewContent] = useState('');
  const [cmsSearch, setCmsSearch] = useState('');
  const [selectedCmsIssue, setSelectedCmsIssue] = useState<Newsletter | null>(null);
  const [cmsModalContent, setCmsModalContent] = useState('');

  const allCmsIssues = [...customNewsletters, ...DEFAULT_NEWSLETTERS];

  useEffect(() => {
    if (selectedCmsIssue) {
      let rawContent = selectedCmsIssue.content;
      const hasHtml = /<[a-z][\s\S]*>/i.test(rawContent);
      if (!hasHtml) {
        rawContent = rawContent.split('\n\n').map((p: string) => `<p style="margin-bottom: 1.5rem;">${p}</p>`).join('');
      }
      import('dompurify').then((module) => {
        const DOMPurify = module.default;
        setCmsModalContent(DOMPurify.sanitize(rawContent));
      });
    } else {
      setCmsModalContent('');
    }
  }, [selectedCmsIssue]);

  const formatEmailMinimal = (email: string) => {
    const [username] = email.split('@');
    return username.length > 6 ? `${username.slice(0, 6)}...` : username;
  };

  const execEditorCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleLinkButton = () => {
    const url = prompt('Enter the link URL (e.g. https://...):');
    if (url) {
      execEditorCommand('createLink', url);
    }
  };

  // Sync content preview safely via DOMPurify on the client side
  useEffect(() => {
    if (content) {
      import('dompurify').then((module) => {
        const DOMPurify = module.default;
        setPreviewContent(DOMPurify.sanitize(content));
      });
    } else {
      setPreviewContent('');
    }
  }, [content]);

  // Sync editor innerHTML when switching tab back to editor
  useEffect(() => {
    if (isAuthenticated && activeTab === 'write' && editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    // Check if previously authenticated in this session
    const authSession = sessionStorage.getItem('dr_hephzi_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      async function loadData() {
        // Load custom newsletters from server
        try {
          const resNews = await fetch('/api/newsletters');
          if (resNews.ok) {
            const dataNews = await resNews.json();
            setCustomNewsletters(dataNews.newsletters || []);
          }
        } catch (e) {
          console.error("Failed to load server custom newsletters", e);
          const storedNewsletters = localStorage.getItem('dr_hephzi_newsletters');
          if (storedNewsletters) {
            try {
              setCustomNewsletters(JSON.parse(storedNewsletters));
            } catch (_) {}
          }
        }

        // Load subscribers and Resend configuration status from server
        try {
          const resSubs = await fetch(`/api/subscribe?passcode=hephzi`);
          if (resSubs.ok) {
            const dataSubs = await resSubs.json();
            setSubscribers(dataSubs.subscribers || []);
            setResendConfigured(!!dataSubs.resendConfigured);
          }
        } catch (e) {
          console.error("Failed to load server subscribers", e);
          const storedSubscribers = localStorage.getItem('dr_hephzi_subscribers');
          if (storedSubscribers) {
            try {
              setSubscribers(JSON.parse(storedSubscribers));
            } catch (_) {}
          }
        }
      }
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'hephzi') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dr_hephzi_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dr_hephzi_auth');
    setPasscode('');
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !content) return;

    setIsSending(true);
    setStatusMessage('');
    setStatusType('');

    try {
      // Estimate read time (approx 200 words per minute)
      const wordCount = content.trim().split(/\s+/).length;
      const wpm = 200;
      const mins = Math.max(1, Math.ceil(wordCount / wpm));
      const readTime = `${mins} min read`;

      // Date formatted as "Month Day, Year"
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const newIssue: Newsletter = {
        id: Date.now().toString(),
        title,
        subject,
        date: formattedDate,
        content,
        readTime,
      };

      // 1. Send the emails using the secure backend route handler if we have subscribers
      let emailStatusText = '';

      if (subscribers.length > 0) {
        const response = await fetch('/api/send-newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            subject,
            content,
            subscribers,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to dispatch emails.');
        }

        if (data.simulated) {
          emailStatusText = `(Simulated dispatch to ${subscribers.length} subscribers in local dev)`;
          setStatusType('warning');
        } else if (data.warning) {
          emailStatusText = `(Warning: ${data.warning})`;
          setStatusType('warning');
        } else {
          emailStatusText = `(Dispatched to ${subscribers.length} subscribers via Resend)`;
          setStatusType('success');
        }
      } else {
        emailStatusText = '(Published to archive, but 0 active subscribers to email)';
        setStatusType('warning');
      }

      // 2. Save newsletter to archive on server
      try {
        await fetch('/api/newsletters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer hephzi',
          },
          body: JSON.stringify(newIssue),
        });
      } catch (err) {
        console.error("Failed to post custom newsletter to server archive", err);
      }

      // 3. Save newsletter to local device storage (backup)
      const updatedNewsletters = [newIssue, ...customNewsletters];
      setCustomNewsletters(updatedNewsletters);
      localStorage.setItem('dr_hephzi_newsletters', JSON.stringify(updatedNewsletters));

      // 4. Update Status
      setStatusMessage(`Newsletter published successfully! ${emailStatusText}`);
      
      // Reset Form fields
      setTitle('');
      setSubject('');
      setContent('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setActiveTab('write');
    } catch (error: any) {
      console.error('Failed to publish newsletter:', error);
      setStatusMessage(`Newsletter archive updated, but email sending failed: ${error.message || error}`);
      setStatusType('error');
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this issue from the archive?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/newsletters?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer hephzi',
        },
      });
    } catch (e) {
      console.error("Failed to delete custom newsletter from server", e);
    }

    const updated = customNewsletters.filter((item) => item.id !== id);
    setCustomNewsletters(updated);
    localStorage.setItem('dr_hephzi_newsletters', JSON.stringify(updated));
  };

  const handleCopyEmails = () => {
    if (subscribers.length === 0) return;
    navigator.clipboard.writeText(subscribers.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderEmailPreview = () => {
    return (
      <div style={{ 
        fontFamily: "Georgia, serif", 
        color: "#352d3d", 
        maxWidth: "600px", 
        margin: "0 auto", 
        padding: "24px 20px", 
        border: "1px solid rgba(43,41,39,0.08)", 
        borderRadius: "8px", 
        backgroundColor: "#ffffff",
        textAlign: "left"
      }}>
        <div style={{ marginBottom: '25px', textAlign: 'center' }}>
          <img 
            src="/HANAT.png" 
            alt="HANAT Logo" 
            style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'inline-block' }}
          />
        </div>
        <h1 style={{ 
          fontFamily: "Georgia, serif", 
          color: "#1e1329", 
          fontWeight: "400", 
          borderTop: "1px solid rgba(43,41,39,0.08)",
          borderBottom: "1px solid rgba(43,41,39,0.08)", 
          padding: "15px 0", 
          margin: "20px 0 25px 0", 
          fontSize: "24px",
          lineHeight: "1.3",
          textAlign: "center"
        }}>
          {title || "Newsletter Title Preview"}
        </h1>
        <p style={{ fontStyle: "italic", color: "#6f647d", fontSize: "14px", margin: "0 0 25px 0", textAlign: "center" }}>
          Delivered to Dr. Hephzi's scientific network.
        </p>
        <div 
          style={{ fontSize: "15px", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: previewContent || '<p style="color: #a19da6; font-style: italic;">Newsletter content will render here as you type...</p>' }}
        />
        <hr style={{ border: "none", borderTop: "1px solid rgba(43,41,39,0.08)", margin: "40px 0 20px 0" }} />
        <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#6f647d", textAlign: "center", margin: "0", lineHeight: "1.5" }}>
          &copy; {new Date().getFullYear()} Dr. Hephzi Angela Tagoe. All rights reserved.<br />
          You received this email because you subscribed to Dr. Hephzi's newsletter.
        </p>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <main className="cms-auth-screen">
        <div className="cms-glass-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <img 
              src="/HANAT.png" 
              alt="HANAT Logo" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain', margin: '0 auto' }}
            />
          </div>
          <h2 className="subscribe-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Canela Text, Canela, Georgia, serif', fontWeight: 400 }}>
            CMS Dashboard
          </h2>
          <p className="subscribe-card-desc" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>
            Enter the passcode to access the workspace.
          </p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Passcode"
              className="subscribe-email-input"
              style={{ borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(43,41,39,0.15)' }}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              autoFocus
            />
            {authError && (
              <p style={{ color: 'var(--accent-magenta)', fontSize: '0.8rem', margin: 0 }}>
                {authError}
              </p>
            )}
            <button type="submit" className="subscribe-submit-btn" style={{ borderRadius: '8px', padding: '0.75rem 0' }}>
              Unlock Workspace
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="cms-workspace-container">
      {/* CMS Workspace Header */}
      <header className="cms-workspace-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="cms-brand-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img 
              src="/HANAT.png" 
              alt="HANAT Logo" 
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
            <span style={{ fontSize: '0.95rem', borderLeft: '1px solid #eaeaea', paddingLeft: '0.6rem', fontFamily: "var(--font-lato), 'Lato', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              CMS
            </span>
          </div>
          <div className="cms-header-actions">
            <a href="/newsletter" className="cms-btn-secondary">
              Return to Site
            </a>
            <span style={{ color: '#eaeaea' }}>|</span>
            <button onClick={handleLogout} className="cms-btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="cms-workspace-body">
        
        {/* Minimal Info/Metrics Bar */}
        <div className="cms-minimal-info-bar">
          <span>Subscribers: {subscribers.length}</span>
          {subscribers.length > 0 && (
            <button onClick={handleCopyEmails} className="cms-info-action-btn">
              {copied ? '(Copied)' : '(Copy emails)'}
            </button>
          )}
          <span className="cms-info-dot">•</span>
          <span>Issues: {customNewsletters.length}</span>
        </div>

        {/* CMS Main Content Area */}
        <section className="cms-main-grid">
          
          {/* Left Block: Compose Form */}
          <div className="cms-card">
            <div className="cms-tabs-header">
              <button 
                className={`cms-tab-btn ${activeTab === 'write' ? 'active' : ''}`}
                onClick={() => setActiveTab('write')}
              >
                Write Issue
              </button>
              <button 
                className={`cms-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
                disabled={!title && !content}
                style={{ opacity: (!title && !content) ? 0.4 : 1, cursor: (!title && !content) ? 'not-allowed' : 'pointer' }}
              >
                Preview Email
              </button>
              <button 
                className={`cms-tab-btn ${activeTab === 'issues' ? 'active' : ''}`}
                onClick={() => setActiveTab('issues')}
              >
                Manage Issues ({allCmsIssues.length})
              </button>
            </div>

            {statusMessage && (
              <div style={{ 
                padding: '0.6rem 0.8rem', 
                backgroundColor: statusType === 'error' ? 'rgba(239, 68, 68, 0.04)' : statusType === 'warning' ? 'rgba(245, 158, 11, 0.04)' : 'rgba(16, 185, 129, 0.04)', 
                borderRadius: '4px', 
                color: statusType === 'error' ? '#ef4444' : statusType === 'warning' ? '#d97706' : '#10b981', 
                fontFamily: "var(--font-lato), 'Lato', sans-serif", 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                marginBottom: '1.5rem',
                border: `1px solid ${statusType === 'error' ? 'rgba(239, 68, 68, 0.1)' : statusType === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
              }}>
                {statusType === 'error' ? '✗' : statusType === 'warning' ? '⚠' : '✓'} {statusMessage}
              </div>
            )}

            {activeTab === 'write' ? (
              <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="cms-form-group">
                  <label className="cms-form-label">Newsletter Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Designing Hands-on Biology Experiments"
                    className="cms-form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="cms-form-group">
                  <label className="cms-form-label">Subject Line</label>
                  <input
                    type="text"
                    placeholder="e.g., Reflections on mobile learning kits in rural schools."
                    className="cms-form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="cms-form-group">
                  <label className="cms-form-label">Body Content</label>
                  
                  {/* Editor Toolbar */}
                  <div className="cms-editor-toolbar">
                    <button type="button" onClick={() => execEditorCommand('bold')} className="cms-toolbar-btn" style={{ fontWeight: 'bold' }}>B</button>
                    <button type="button" onClick={() => execEditorCommand('italic')} className="cms-toolbar-btn" style={{ fontStyle: 'italic' }}>I</button>
                    <button type="button" onClick={() => execEditorCommand('underline')} className="cms-toolbar-btn" style={{ textDecoration: 'underline' }}>U</button>
                    <span style={{ color: '#eaeaea', margin: '0 0.25rem' }}>|</span>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<h1>')} className="cms-toolbar-btn">H1</button>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<h2>')} className="cms-toolbar-btn">H2</button>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<p>')} className="cms-toolbar-btn">P</button>
                    <span style={{ color: '#eaeaea', margin: '0 0.25rem' }}>|</span>
                    <button type="button" onClick={() => execEditorCommand('insertUnorderedList')} className="cms-toolbar-btn">List</button>
                    <button type="button" onClick={() => execEditorCommand('insertOrderedList')} className="cms-toolbar-btn">1.</button>
                    <button type="button" onClick={handleLinkButton} className="cms-toolbar-btn">Link</button>
                    <span style={{ color: '#eaeaea', margin: '0 0.25rem' }}>|</span>
                    <button type="button" onClick={() => execEditorCommand('removeFormat')} className="cms-toolbar-btn" style={{ color: '#ff4d4f' }}>Clear</button>
                  </div>

                  {/* Editable textarea area */}
                  <div
                    ref={editorRef}
                    contentEditable={true}
                    className="cms-editor-textarea"
                    data-placeholder="Write your email body here..."
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    style={{ minHeight: '280px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="subscribe-submit-btn" 
                  style={{ 
                    borderRadius: '4px', 
                    alignSelf: 'flex-start',
                    opacity: isSending ? 0.7 : 1,
                    cursor: isSending ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isSending}
                >
                  {isSending ? 'Publishing & Sending...' : 'Publish & Send'}
                </button>
              </form>
            ) : activeTab === 'preview' ? (
              <div className="cms-preview-container">
                {renderEmailPreview()}
              </div>
            ) : (
              <div className="cms-management-table-container">
                <input
                  type="text"
                  placeholder="Search issues by title or subject..."
                  className="cms-table-search-bar"
                  value={cmsSearch}
                  onChange={(e) => setCmsSearch(e.target.value)}
                />
                
                <table className="cms-issues-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Title & Subject</th>
                      <th>Type</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCmsIssues
                      .filter(item => {
                        const q = cmsSearch.toLowerCase();
                        return item.title.toLowerCase().includes(q) || item.subject.toLowerCase().includes(q);
                      })
                      .map(item => {
                        const isDefault = ['1', '2', '3'].includes(item.id);
                        return (
                          <tr key={item.id}>
                            <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.date}</td>
                            <td style={{ color: 'var(--primary-color)' }}>
                              <div style={{ fontWeight: 500 }}>{item.title}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                                {item.subject}
                              </div>
                            </td>
                            <td>
                              <span style={{ 
                                fontSize: '0.7rem', 
                                padding: '0.15rem 0.4rem', 
                                borderRadius: '3px',
                                backgroundColor: isDefault ? '#f0f0f0' : 'rgba(101, 45, 146, 0.08)',
                                color: isDefault ? '#555555' : 'var(--accent-purple)',
                                fontWeight: 600
                              }}>
                                {isDefault ? 'System' : 'Custom'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button 
                                type="button"
                                onClick={() => setSelectedCmsIssue(item)} 
                                className="cms-action-btn cms-action-btn-preview"
                              >
                                Read
                              </button>
                              {!isDefault && (
                                <button 
                                  type="button"
                                  onClick={() => handleDeleteNewsletter(item.id)} 
                                  className="cms-action-btn cms-action-btn-delete"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Block: Subscribers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Live Subscribers list */}
            <div>
              <h3 className="cms-sub-title">Mailing List</h3>

              {subscribers.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  No active subscribers.
                </p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 0.6rem', maxHeight: '550px', overflowY: 'auto' }}>
                  {subscribers.map((emailAddr, idx) => (
                    <span 
                      key={idx} 
                      title={emailAddr} 
                      style={{ 
                        fontSize: '0.8rem',
                        color: 'var(--primary-color)',
                        backgroundColor: '#f5f5f5',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'help'
                      }}
                    >
                      {formatEmailMinimal(emailAddr)}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>

        </section>
      </main>

      {/* Modal overlay reader */}
      {selectedCmsIssue && (
        <div className="newsletter-modal-overlay" onClick={() => setSelectedCmsIssue(null)}>
          <div className="newsletter-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="newsletter-modal-close"
              onClick={() => setSelectedCmsIssue(null)}
              aria-label="Close reader"
            >
              &times;
            </button>

            <div className="newsletter-modal-header">
              <span className="newsletter-item-meta" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Published on {selectedCmsIssue.date} &bull; {selectedCmsIssue.readTime}
              </span>
              <h2 className="newsletter-modal-title">{selectedCmsIssue.title}</h2>
              <p style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
                Subject: {selectedCmsIssue.subject}
              </p>
            </div>

            <div 
              className="newsletter-modal-body"
              dangerouslySetInnerHTML={{ __html: cmsModalContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
