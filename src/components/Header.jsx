function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">💼</span>
        <div>
          <h1>Job Application Tracker</h1>
          <p className="header-subtitle">Track, organize, and manage your job search</p>
        </div>
      </div>
      <div className="header-badge">
        <span>Version 1.0 — UI Prototype</span>
      </div>
    </header>
  );
}

export default Header;
