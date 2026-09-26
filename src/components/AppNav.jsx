import { useState } from "react";
import ConfirmDialog from './ConfirmDialog';

function getInitials(name) {
  const words = (typeof name === "string" ? name : "").trim().split(/\s+/).filter(Boolean);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return words[0]?.[0]?.toUpperCase() || "?";
}

function AppNav({ activePage, setActivePage, profileName = "", onGoHome, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutError, setLogoutError] = useState('');

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
        <button
          type="button"
          className="nav-brand"
          aria-label="Go to the top of the landing page"
          onClick={() => {
            setMobileOpen(false);
            onGoHome();
          }}
        >
          <span className="nav-brand-text">
            Career<span className="nav-brand-accent">Tracker</span>
          </span>
        </button>

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
            title={profileName || "Profile"}
            aria-label={`Profile${profileName ? `: ${profileName}` : ""}`}
          >
            {getInitials(profileName)}
          </button>
          <button type="button" className="nav-logout" onClick={() => { setLogoutError(''); setShowLogoutConfirm(true); }}>
            Log out
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
        </div>
      )}

      {showLogoutConfirm && <ConfirmDialog
        title="Log out and clear your data?"
        message="This permanently deletes your applications, saved jobs, interviews, profile, and preferences saved in this browser. This cannot be undone."
        errorMessage={logoutError}
        confirmLabel="Log out and delete data"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          if (onLogout()) setShowLogoutConfirm(false);
          else setLogoutError('The browser could not clear the saved data. Your information is still here. Try again.');
        }}
      />}
    </header>
  );
}

export default AppNav;
