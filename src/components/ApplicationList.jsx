import ApplicationCard from './ApplicationCard';

function ApplicationList({ applications }) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📂</div>
        <h3>No applications yet</h3>
        <p>Start tracking your job search by adding your first application.</p>
      </div>
    );
  }

  // Group applications by status for a more structured, premium view
  const statuses = ['Interview', 'Offer', 'Applied', 'Rejected'];
  
  return (
    <div className="premium-list-container">
      {statuses.map(status => {
        const appsInStatus = applications.filter(a => a.status === status);
        if (appsInStatus.length === 0) return null;

        return (
          <div key={status} className="status-group">
            <div className="status-group-header">
              <span className={`status-dot dot-${status.toLowerCase()}`}></span>
              <h3>{status}</h3>
              <span className="status-count">{appsInStatus.length}</span>
            </div>
            
            <div className="app-grid">
              {appsInStatus.map(app => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ApplicationList;
