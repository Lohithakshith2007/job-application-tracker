function ApplicationCard({ company, role, status, date, notes }) {
  // Helper to determine status badge CSS class
  const getStatusClass = (statusStr) => {
    switch (statusStr.toLowerCase()) {
      case 'applied': return 'badge-applied';
      case 'interview': return 'badge-interview';
      case 'offer': return 'badge-offer';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-default';
    }
  };

  return (
    <div className="app-card">
      <div className="app-card-header">
        <div className="app-card-title">
          <h3>{role}</h3>
          <p className="company-name">🏢 {company}</p>
        </div>
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>

      <div className="app-card-body">
        <p className="app-date">📅 Applied: <span>{date}</span></p>
        {notes && <p className="app-notes">📝 {notes}</p>}
      </div>
    </div>
  );
}

export default ApplicationCard;
