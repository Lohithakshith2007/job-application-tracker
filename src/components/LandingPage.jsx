import { useState, useEffect, useLayoutEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../landing.css';

function LandingPage({ onGetStarted }) {
  const [navSolid, setNavSolid] = useState(false);
  const [mousePos, setMousePos] = useState({ rx: 0.5, ry: 0.5, px: 0, py: 0 });
  const [scrollY, setScrollY] = useState(0);

  useScrollReveal();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setNavSolid(window.scrollY > 60);
    };
    const handleMouse = (e) => {
      setMousePos({ 
        rx: e.clientX / window.innerWidth, 
        ry: e.clientY / window.innerHeight,
        px: e.pageX,
        py: e.pageY
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="landing-root">

      {/* ── Sticky Nav ── */}
      <nav className={`l-nav ${navSolid ? 'solid' : ''}`}>
        <button type="button" className="l-nav-brand" aria-label="Scroll to the top of the landing page" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Career<em>Tracker</em>
        </button>
        <div className="l-nav-links">
          <a href="#features" className="l-nav-link">Features</a>
          <a href="#how" className="l-nav-link">How it works</a>
        </div>
        <button className="btn btn-primary btn-sm l-nav-cta" onClick={onGetStarted} style={{ width: 'auto', marginTop: 0 }}>
          Open App
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="l-hero">
        {/* Base Grid */}
        <div className="hero-grid"></div>
        {/* Cursor Glow Grid Effect */}
        <div 
          className="hero-grid hero-grid-glow" 
          style={{ 
              maskImage: `radial-gradient(600px circle at ${mousePos.px}px ${mousePos.py}px, rgba(0,0,0,1), transparent)`,
              WebkitMaskImage: `radial-gradient(600px circle at ${mousePos.px}px ${mousePos.py}px, rgba(0,0,0,1), transparent)`
          }}
        ></div>

        <div className="hero-orb hero-orb-1" style={{ transform: `translate(${mousePos.rx * 30}px, ${mousePos.ry * 20}px)` }}></div>
        <div className="hero-orb hero-orb-2" style={{ transform: `translate(${-mousePos.rx * 25}px, ${mousePos.ry * -15}px)`, willChange: 'transform' }}></div>

        <div className="l-hero-content">
          <div className="hero-eyebrow he-1">✦ Free &amp; Open to Everyone</div>

          <h1 className="hero-h1 he-2">
            Your entire job search,<br />
            <span className="hero-h1-grd">beautifully organized.</span>
          </h1>

          <p className="hero-sub he-3">
            Stop losing track of applications in endless spreadsheets. CareerTracker gives you a focused, structured cockpit for every stage of your job hunt.
          </p>

          <div className="hero-btns he-4">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Start Tracking Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <a href="#features" className="btn btn-secondary btn-lg">Explore Features</a>
          </div>

          <div className="hero-trust he-4">
            <span>No account needed</span>
            <span className="hero-trust-sep">•</span>
            <span>100% private</span>
            <span className="hero-trust-sep">•</span>
            <span>Free forever</span>
          </div>
        </div>

        {/* App Preview */}
        <div className="hero-preview-wrap he-5" style={{ transform: `translateY(${scrollY * 0.12}px)` }}>
          <div className="preview-glow"></div>
          <div className="preview-shell">
            <div className="prev-bar">
              <span className="prev-bar-d prev-bar-r"></span>
              <span className="prev-bar-d prev-bar-y"></span>
              <span className="prev-bar-d prev-bar-g"></span>
              <span className="prev-bar-url">app.careertracker.io/dashboard</span>
            </div>
            <div className="prev-body">
              <div className="prev-stats-row">
                <div className="prev-stat s-total"><span className="prev-stat-num">12</span><span className="prev-stat-label">Total</span></div>
                <div className="prev-stat s-applied"><span className="prev-stat-num">6</span><span className="prev-stat-label">Applied</span></div>
                <div className="prev-stat s-interview"><span className="prev-stat-num">3</span><span className="prev-stat-label">Interview</span></div>
                <div className="prev-stat s-offer"><span className="prev-stat-num">2</span><span className="prev-stat-label">Offer</span></div>
                <div className="prev-stat s-rejected"><span className="prev-stat-num">1</span><span className="prev-stat-label">Rejected</span></div>
              </div>
              <div className="prev-entries">
                <div className="prev-entry"><div><div className="prev-entry-title">Software Engineer</div><div className="prev-entry-sub">Stripe · Applied Sep 24</div></div><span className="prev-pill pp-interview">Interview</span></div>
                <div className="prev-entry"><div><div className="prev-entry-title">React Developer</div><div className="prev-entry-sub">Vercel · Applied Sep 20</div></div><span className="prev-pill pp-offer">Offer</span></div>
                <div className="prev-entry"><div><div className="prev-entry-title">Product Designer</div><div className="prev-entry-sub">Linear · Applied Sep 18</div></div><span className="prev-pill pp-applied">Applied</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="l-features">
        <div className="l-sec-head reveal-up">
          <p className="l-sec-eyebrow">Built for serious job seekers</p>
          <h2 className="l-sec-h2">Everything you need in one place</h2>
          <p className="l-sec-p">A focused workspace that turns job hunting chaos into clarity.</p>
        </div>

        <div className="l-feat-grid reveal-up stagger-1">
          <div className="l-feat-cell">
            <div className="l-feat-icon">📊</div>
            <div className="l-feat-title">Live Pipeline Dashboard</div>
            <p className="l-feat-desc">Real-time stats across every application stage — from submitted to offer signed.</p>
          </div>
          <div className="l-feat-cell">
            <div className="l-feat-icon">🎯</div>
            <div className="l-feat-title">Smart Filter & Search</div>
            <p className="l-feat-desc">Instantly find any application by company, role, status or date with lightning-fast filtering.</p>
          </div>
          <div className="l-feat-cell">
            <div className="l-feat-icon">🗓</div>
            <div className="l-feat-title">Interview Prep Hub</div>
            <p className="l-feat-desc">Track dates, interviewer names, round types, and structured preparation notes per interview.</p>
          </div>
          <div className="l-feat-cell">
            <div className="l-feat-icon">📌</div>
            <div className="l-feat-title">Saved Job Board</div>
            <p className="l-feat-desc">Bookmark roles from anywhere — then track salary ranges, tech stacks, and location requirements.</p>
          </div>
          <div className="l-feat-cell">
            <div className="l-feat-icon">📈</div>
            <div className="l-feat-title">Conversion Analytics</div>
            <p className="l-feat-desc">Understand your application-to-interview and interview-to-offer conversion rates instantly.</p>
          </div>
          <div className="l-feat-cell">
            <div className="l-feat-icon">⚡</div>
            <div className="l-feat-title">Fast & Lightweight</div>
            <p className="l-feat-desc">No file bloat, no trackers, no login walls. It is instant, private and entirely yours.</p>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how" className="l-how">
        <div className="l-sec-head reveal-up">
          <p className="l-sec-eyebrow">The process</p>
          <h2 className="l-sec-h2">From first look to signed offer</h2>
          <p className="l-sec-p">A structured four-step workflow that keeps nothing hidden.</p>
        </div>

        <div className="l-steps-row reveal-up stagger-2">
          <div className="l-step">
            <div className="l-step-badge">01</div>
            <h3>Discover &amp; Bookmark</h3>
            <p>Save roles you love to your Saved Jobs board before tailoring your resume.</p>
          </div>
          <div className="l-step">
            <div className="l-step-badge">02</div>
            <h3>Apply &amp; Log It</h3>
            <p>The moment you hit submit, log the company, role, status, date, and any notes.</p>
          </div>
          <div className="l-step">
            <div className="l-step-badge">03</div>
            <h3>Nail the Interviews</h3>
            <p>Track each round — time, format, interviewer — and write your preparation notes.</p>
          </div>
          <div className="l-step">
            <div className="l-step-badge">04</div>
            <h3>Evaluate &amp; Decide</h3>
            <p>Compare offers and activity data side by side to choose with confidence.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="l-cta reveal-up">
        <h2>Ready to organize your job search?</h2>
        <p>Join thousands of developers and designers using CareerTracker to get hired faster.</p>
        <button className="btn btn-primary btn-lg" onClick={onGetStarted} style={{ width: 'auto', marginTop: 0 }}>
          Open CareerTracker — It's Free
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="l-footer">
        <span className="l-footer-brand">Career<em>Tracker</em></span>
        <span className="l-footer-copy">© 2026 CareerTracker. Built for developers.</span>
      </footer>
    </div>
  );
}

export default LandingPage;
