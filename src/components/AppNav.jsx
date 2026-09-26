import { useState } from "react";

function AppNav({ activePage, setActivePage, onOpenLanding }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const pages = [
    { id: "dashboard", label: "Dashboard" },
    { id: "applications", label: "Applications" },
    { id: "saved-jobs", label: "Saved Jobs" },
    { id: "interviews", label: "Interviews" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
  ];

  const go = (id) => {
    setActivePage(id);
    setMobileOpen(false);
  };

  return (
    <header className="app-nav">
      <div className="nav-inner">
        {/* Brand */}
        <div className="nav-brand" onClick={onOpenLanding}>
          <span className="nav-brand-text">
            Career<span className="nav-brand-accent">Tracker</span>
          </span>
        </div>

        {/* Desktop links */}
        <nav className="nav-links">
          {pages.map((p) => (
            <button
              key={p.id}
              className={`nav-link ${activePage === p.id ? "active" : ""}`}
              onClick={() => go(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>

        {/* User avatar — clicking goes to settings */}
        <div className="nav-user-area">
          <button
            className="nav-profile"
            onClick={() => go("settings")}
            title="Profile"
          >
            AR
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet drawer */}
      {mobileOpen && (
        <div className="nav-drawer">
          {pages.map((p) => (
            <button
              key={p.id}
              className={`nav-drawer-link ${activePage === p.id ? "active" : ""}`}
              onClick={() => go(p.id)}
            >
              {p.label}
            </button>
          ))}
          <button
            className="nav-drawer-link"
            style={{ color: "var(--tx-3)", marginTop: "8px" }}
            onClick={onOpenLanding}
          >
            ← Back to landing
          </button>
        </div>
      )}
    </header>
  );
}

export default AppNav;
