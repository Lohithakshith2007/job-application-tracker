import { useState } from 'react';

const JOBS = [
  { id: 1, company: 'Vercel',    role: 'Senior Frontend Engineer', location: 'Remote', salary: '$160k–$190k', tags: ['React','Next.js','TypeScript'], posted: '2 days ago' },
  { id: 2, company: 'Linear',    role: 'Product Engineer',          location: 'San Francisco', salary: '$170k–$200k', tags: ['React','Electron','TypeScript'], posted: '4 days ago' },
  { id: 3, company: 'Supabase',  role: 'Developer Advocate',        location: 'Remote', salary: '$140k–$165k', tags: ['PostgreSQL','Open Source'], posted: '1 week ago' },
  { id: 4, company: 'Raycast',   role: 'Extension Engineer',        location: 'Remote/EU', salary: '£90k–£110k', tags: ['Node.js','Swift'], posted: '3 days ago' },
];

const INTERVIEWS = [
  { id: 1, company: 'Frontend Studio', role: 'React Developer', day: '02', month: 'Oct', time: '2:00 PM — 3:00 PM EST', type: 'Technical Interview', interviewer: 'Sarah Jenkins (Tech Lead)', location: 'Google Meet', notes: 'Be ready to discuss custom hooks, state patterns, and performance optimization.', status: 'Upcoming' },
  { id: 2, company: 'Stripe',          role: 'Software Engineer',  day: '05', month: 'Oct', time: '10:30 AM PST', type: 'System Design',        interviewer: 'David Chen (Staff Eng.)', location: 'Zoom',        notes: 'Focus on API design, idempotency, and caching strategies.', status: 'Upcoming' },
  { id: 3, company: 'TechCorp Labs',   role: 'Jr. Frontend Eng.',  day: '18', month: 'Sep', time: '1:00 PM EST', type: 'HR Screening',          interviewer: 'Emily Watson (TA)',       location: 'Phone',       notes: 'Discussed salary and start date timeline.', status: 'Completed' },
];

/* ── Saved Jobs ── */
export function SavedJobsPage() {
  const [jobs, setJobs] = useState(JOBS);
  const remove = (id) => setJobs(jobs.filter(j => j.id !== id));
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Saved Jobs</h1>
          <p>Roles you have bookmarked to apply to later.</p>
        </div>
        <span className="badge-count">{jobs.length} saved</span>
      </div>
      {jobs.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📌</div><h3>Nothing saved yet</h3><p>Bookmark a role to track it here.</p></div>
      ) : (
        <div className="jobs-grid">
          {jobs.map(j => (
            <div key={j.id} className="job-card">
              <div className="job-card-head">
                <div className="job-card-meta">
                  <h3>{j.role}</h3>
                  <p>{j.company} · {j.location}</p>
                </div>
                <button className="job-remove" onClick={() => remove(j.id)} title="Remove">✕</button>
              </div>
              <div className="job-tags">{j.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="job-footer">
                <div><div className="job-salary">{j.salary}</div><div className="job-posted">{j.posted}</div></div>
                <button className="btn btn-secondary btn-sm">Apply →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Interviews ── */
export function InterviewsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Interviews</h1>
          <p>Upcoming and past interview rounds with preparation notes.</p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ width: 'auto' }}>+ Add Interview</button>
      </div>
      <div className="interviews-list">
        {INTERVIEWS.map(iv => (
          <div key={iv.id} className="iv-card">
            <div className="iv-date-box">
              <span className="iv-date-day">{iv.day}</span>
              <span className="iv-date-mo">{iv.month}</span>
            </div>
            <div className="iv-info">
              <h3>{iv.role} — {iv.company}</h3>
              <p>{iv.type} · {iv.interviewer}</p>
              <div className="iv-meta">
                <span>⏰ {iv.time}</span>
                <span>📍 {iv.location}</span>
              </div>
              {iv.notes && <div className="iv-note">💡 {iv.notes}</div>}
            </div>
            <div className="iv-badge">
              <span className={`badge ${iv.status === 'Upcoming' ? 'badge-interview' : 'badge-applied'}`}>{iv.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Analytics ── */
export function AnalyticsPage({ applications = [] }) {
  const t = applications.length || 12;
  const a = applications.filter(x => x.status === 'Applied').length   || 6;
  const i = applications.filter(x => x.status === 'Interview').length || 3;
  const o = applications.filter(x => x.status === 'Offer').length     || 2;
  const r = applications.filter(x => x.status === 'Rejected').length  || 1;
  const pct = (n) => Math.round((n / t) * 100) + '%';

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Your application pipeline at a glance.</p>
        </div>
      </div>
      <div className="analytics-layout">
        <div className="a-panel">
          <h3>Status Breakdown</h3>
          <div className="bar-rows">
            {[['Applied', a, t, 'fill-applied'], ['Interview', i, t, 'fill-interview'], ['Offer', o, t, 'fill-offer'], ['Rejected', r, t, 'fill-rejected']].map(([label, val, tot, cls]) => (
              <div key={label} className="bar-row">
                <div className="bar-info">
                  <span className="bar-info-label">{label}</span>
                  <span className="bar-info-val">{val} · {Math.round(val/tot*100)}%</span>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${cls}`} style={{ width: pct(val) }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="a-panel">
          <h3>Conversion</h3>
          <div className="funnel-stack">
            <div className="funnel-row"><span className="funnel-lbl">Total Logged</span><span className="funnel-val">{t}</span></div>
            <div className="funnel-row"><span className="funnel-lbl">Interview Rate</span><span className="funnel-val">{Math.round((i+o)/t*100)}%</span></div>
            <div className="funnel-row"><span className="funnel-lbl">Offer Rate</span><span className="funnel-val">{Math.round(o/t*100)}%</span></div>
            <div className="funnel-row"><span className="funnel-lbl">Active</span><span className="funnel-val">{a + i}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Settings ── */
export function SettingsPage() {
  const [email, setEmail] = useState(true);
  const [digest, setDigest] = useState(false);
  const [compact, setCompact] = useState(false);
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile and preferences.</p>
        </div>
      </div>
      <div className="settings-wrap">
        <div className="settings-sidebar">
          <button className="stab active">General</button>
          <button className="stab">Notifications</button>
          <button className="stab">Display</button>
          <button className="stab">Data Export</button>
        </div>
        <div className="settings-panel">
          <div className="settings-group">
            <div className="settings-group-title">Profile</div>
            <div className="field"><label>Full Name</label><input className="input-base" defaultValue="Alex Rivera" /></div>
            <div className="field"><label>Target Role</label><input className="input-base" defaultValue="Senior Frontend Engineer" /></div>
          </div>
          <div className="settings-group">
            <div className="settings-group-title">Preferences</div>
            <div className="setting-row">
              <div className="setting-text"><h4>Email Reminders</h4><p>Alerts before upcoming interviews</p></div>
              <div className={`toggle ${email ? 'on' : ''}`} onClick={() => setEmail(!email)}></div>
            </div>
            <div className="setting-row">
              <div className="setting-text"><h4>Weekly Digest</h4><p>Sunday summary of your search metrics</p></div>
              <div className={`toggle ${digest ? 'on' : ''}`} onClick={() => setDigest(!digest)}></div>
            </div>
            <div className="setting-row">
              <div className="setting-text"><h4>Compact View</h4><p>Denser layout for application lists</p></div>
              <div className={`toggle ${compact ? 'on' : ''}`} onClick={() => setCompact(!compact)}></div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
