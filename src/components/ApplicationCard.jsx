function ApplicationCard({ app }) {
  // Determine premium pill class based on status
  let pillClass = 'pp-applied';
  if (app.status === 'Interview') pillClass = 'pp-interview';
  if (app.status === 'Offer') pillClass = 'pp-offer';
  if (app.status === 'Rejected') pillClass = 'pp-rejected';

  // Format date slightly
  const dateStr = app.date ? new Date(app.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';

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
        
        <div className="pc-actions">
          <button className="pc-action-btn" title="Edit Application">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button className="pc-action-btn pc-danger" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>

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
