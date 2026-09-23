function Header() {
  return (
    <header className="product-header">
      <div className="brand-trigger">
        <div className="brand-logo">J</div>
        <span className="brand-text">Job Tracker</span>
      </div>
      <nav className="header-actions">
        <a href="#" className="nav-link">Dashboard</a>
        <a href="#" className="nav-link">Analytics</a>
        <a href="#" className="nav-link">Settings</a>
      </nav>
    </header>
  );
}

export default Header;
