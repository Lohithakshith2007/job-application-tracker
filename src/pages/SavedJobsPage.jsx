import { useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';

const emptyJob = { company: '', role: '', location: '', salary: '', tags: '', posted: '' };

function SavedJobsPage({ jobs, onAddJob, onDeleteJob, onAddApplication }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyJob);
  const [jobToDelete, setJobToDelete] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    onAddJob({
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      posted: formData.posted.trim() || 'Saved today',
    });
    setFormData(emptyJob);
    setIsAdding(false);
  }

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-subtitle">Bookmark open positions to review and apply to later.</p>
        </div>
        <div className="page-header-actions">
          <span className="badge-count" style={{ fontSize: '.9rem', padding: '6px 14px' }}>
            {jobs.length} Bookmarked
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => setIsAdding((current) => !current)}>
            {isAdding ? 'Cancel' : '+ Save Job'}
          </button>
        </div>
      </div>

      {isAdding && (
        <form className="data-entry-panel" onSubmit={handleSubmit}>
          <h2>Save a job</h2>
          <div className="data-entry-grid">
            <div className="field"><label htmlFor="job-company">Company</label><input className="input-base" id="job-company" name="company" maxLength={120} value={formData.company} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="job-role">Role</label><input className="input-base" id="job-role" name="role" maxLength={160} value={formData.role} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="job-location">Location</label><input className="input-base" id="job-location" name="location" maxLength={120} value={formData.location} onChange={updateField} placeholder="Remote or city" /></div>
            <div className="field"><label htmlFor="job-salary">Salary</label><input className="input-base" id="job-salary" name="salary" maxLength={80} value={formData.salary} onChange={updateField} placeholder="Optional" /></div>
            <div className="field"><label htmlFor="job-tags">Skills / tags</label><input className="input-base" id="job-tags" name="tags" maxLength={500} value={formData.tags} onChange={updateField} placeholder="React, TypeScript" /></div>
            <div className="field"><label htmlFor="job-posted">Posting age</label><input className="input-base" id="job-posted" name="posted" value={formData.posted} onChange={updateField} placeholder="Posted today" /></div>
          </div>
          <div className="data-entry-actions"><button type="submit" className="btn btn-primary btn-sm">Save Job</button></div>
        </form>
      )}

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
                  <div className="job-card-logo">{job.company.charAt(0).toUpperCase()}</div>
                  <div className="job-card-title">
                    <h3>{job.role}</h3>
                    <p>{job.company}{job.location ? ` • ${job.location}` : ''}</p>
                  </div>
                </div>
                <button
                  className="btn-ghost"
                  style={{ padding: '4px 8px', borderRadius: 'var(--r-sm)', color: 'var(--rejected)' }}
                  onClick={() => setJobToDelete(job)}
                  title="Remove saved job"
                  aria-label={`Remove ${job.role} at ${job.company}`}
                >
                  ✕
                </button>
              </div>

              {job.tags?.length > 0 && <div className="job-meta-pills">{job.tags.map((tag) => <span key={tag} className="meta-pill">{tag}</span>)}</div>}

              <div className="job-card-footer">
                <div>
                  {job.salary && <span className="job-salary">{job.salary}</span>}
                  <p style={{ fontSize: '.75rem', color: 'var(--tx-3)', marginTop: '2px' }}>{job.posted}</p>
                </div>
                <button
                  className="btn btn-accent-ghost btn-sm"
                  onClick={() => onAddApplication({ company: job.company, role: job.role, status: 'Applied', date: new Date().toISOString().slice(0, 10), notes: `Saved job${job.location ? ` • ${job.location}` : ''}${job.salary ? ` • ${job.salary}` : ''}` })}
                >
                  Add to Applications →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {jobToDelete && <ConfirmDialog
        title="Remove saved job?"
        message={`Remove ${jobToDelete.role} at ${jobToDelete.company} from your saved jobs?`}
        confirmLabel="Remove Job"
        onCancel={() => setJobToDelete(null)}
        onConfirm={() => { onDeleteJob(jobToDelete.id); setJobToDelete(null); }}
      />}
    </div>
  );
}

export default SavedJobsPage;
