import { useState } from 'react';
import ApplicationCard from '../components/ApplicationCard';

function ApplicationsPage({ applications }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = applications.filter((app) => {
    const matchesFilter = filter === 'All' || app.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = app.company.toLowerCase().includes(search.toLowerCase()) ||
                          app.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">Manage, search, and filter all your job search entries in one place.</p>
        </div>
        <span className="badge-count" style={{ fontSize: '.9rem', padding: '6px 14px' }}>
          {applications.length} Total
        </span>
      </div>

      {/* Toolbar */}
      <div className="tool-bar">
        <div className="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-pills">
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
            <button
              key={status}
              className={`filter-pill ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No applications found</h3>
          <p>No job applications match your current search or filter criteria.</p>
          <button className="btn btn-primary btn-sm" style={{ width: 'auto', marginTop: '14px' }} onClick={() => { setFilter('All'); setSearch(''); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="app-grid">
          {filtered.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
