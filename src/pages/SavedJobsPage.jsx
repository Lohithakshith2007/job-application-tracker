import { useState } from 'react';

const initialSavedJobs = [
  {
    id: 1,
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    location: 'Remote (US/EU)',
    salary: '$160,000 - $190,000',
    tags: ['React', 'Next.js', 'TypeScript'],
    posted: '2 days ago'
  },
  {
    id: 2,
    company: 'Linear',
    role: 'Product Engineer',
    location: 'San Francisco, CA',
    salary: '$170,000 - $200,000',
    tags: ['React', 'GraphQL', 'Electron'],
    posted: '4 days ago'
  },
  {
    id: 3,
    company: 'Supabase',
    role: 'Developer Advocate',
    location: 'Remote',
    salary: '$140,000 - $170,000',
    tags: ['PostgreSQL', 'Technical Writing', 'Open Source'],
    posted: '1 week ago'
  },
  {
    id: 4,
    company: 'Raycast',
    role: 'Extension Engineer',
    location: 'London, UK / Remote',
    salary: '£90,000 - £110,000',
    tags: ['Node.js', 'Swift', 'React'],
    posted: '3 days ago'
  }
];

function SavedJobsPage() {
  const [jobs, setJobs] = useState(initialSavedJobs);

  const removeJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-subtitle">Bookmark open positions to review and apply to later.</p>
        </div>
        <span className="badge-count" style={{ fontSize: '.9rem', padding: '6px 14px' }}>
          {jobs.length} Bookmarked
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-icon">📌</div>
          <h3>No saved jobs</h3>
          <p>You haven't bookmarked any job postings yet.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-head">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div className="job-card-logo">{job.company.charAt(0)}</div>
                  <div className="job-card-title">
                    <h3>{job.role}</h3>
                    <p>{job.company} • {job.location}</p>
                  </div>
                </div>
                <button
                  className="btn-ghost"
                  style={{ padding: '4px 8px', borderRadius: 'var(--r-sm)', color: 'var(--rejected)' }}
                  onClick={() => removeJob(job.id)}
                  title="Remove saved job"
                >
                  ✕
                </button>
              </div>

              <div className="job-meta-pills">
                {job.tags.map((tag) => (
                  <span key={tag} className="meta-pill">{tag}</span>
                ))}
              </div>

              <div className="job-card-footer">
                <div>
                  <span className="job-salary">{job.salary}</span>
                  <p style={{ fontSize: '.75rem', color: 'var(--tx-3)', marginTop: '2px' }}>{job.posted}</p>
                </div>
                <button className="btn btn-accent-ghost btn-sm">
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobsPage;
