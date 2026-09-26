import { useState } from 'react';

function ApplicationCard({ app, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(app);
  // Determine premium pill class based on status
  let pillClass = 'pp-applied';
  if (app.status === 'Interview') pillClass = 'pp-interview';
  if (app.status === 'Offer') pillClass = 'pp-offer';
  if (app.status === 'Rejected') pillClass = 'pp-rejected';

  // Format date slightly
  const dateStr = app.date ? new Date(`${app.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';

  function handleEdit(event) {
    event.preventDefault();
    onUpdate?.(app.id, formData);
    setIsEditing(false);
  }

  return (
    <div className="premium-card group">
      <div className="premium-card-header">
        <div className="pc-meta">
          <div className="pc-logo-box">
            {app.company.charAt(0).toUpperCase()}
          </div>
          <div className="pc-titles">
            <h4 className="pc-role">{app.role}</h4>
            <p className="pc-company">{app.company}</p>
          </div>
        </div>
        
        {(onUpdate || onDelete) && <div className="pc-actions">
          {onUpdate && <button className="pc-action-btn" title="Edit Application" aria-label={`Edit ${app.role} at ${app.company}`} onClick={() => { setFormData(app); setIsEditing((current) => !current); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>}
          {onDelete && <button className="pc-action-btn pc-danger" title="Delete" aria-label={`Delete ${app.role} at ${app.company}`} onClick={() => {
            if (window.confirm(`Delete the ${app.role} application at ${app.company}?`)) onDelete(app.id);
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>}
        </div>}
      </div>

      {isEditing && <form className="application-edit-form" onSubmit={handleEdit}>
        <label>Company<input className="input-base" maxLength={120} value={formData.company} onChange={(event) => setFormData((current) => ({ ...current, company: event.target.value }))} required /></label>
        <label>Role<input className="input-base" maxLength={160} value={formData.role} onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))} required /></label>
        <label>Status<select className="input-base" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option></select></label>
        <label>Applied date<input className="input-base" type="date" value={formData.date || ''} onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))} /></label>
        <label className="application-edit-wide">Notes<textarea className="input-base" maxLength={2000} rows="3" value={formData.notes || ''} onChange={(event) => setFormData((current) => ({ ...current, notes: event.target.value }))} /></label>
        <div className="data-entry-actions application-edit-wide"><button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">Save Changes</button></div>
      </form>}

      {app.notes && (
        <div className="pc-notes">
          <p>{app.notes}</p>
        </div>
      )}

      <div className="pc-footer">
        <span className="pc-date">Applied {dateStr}</span>
        <span className={`pc-pill ${pillClass}`}>{app.status}</span>
      </div>
    </div>
  );
}

export default ApplicationCard;
