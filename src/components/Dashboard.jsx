function Dashboard({ applications = [] }) {
  // Calculate statistics dynamically
  const total = applications.length;
  const applied = applications.filter((app) => app.status === 'Applied').length;
  const interview = applications.filter((app) => app.status === 'Interview').length;
  const offer = applications.filter((app) => app.status === 'Offer').length;
  const rejected = applications.filter((app) => app.status === 'Rejected').length;

  return (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <p>Your job application pipeline at a glance</p>
      </div>
      <div className="metrics-grid">
        <div className="metric-card metric-total">
          <span className="metric-value">{total}</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Total Applications
          </div>
        </div>

        <div className="metric-card metric-applied">
          <span className="metric-value">{applied}</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Applied
          </div>
        </div>

        <div className="metric-card metric-interview">
          <span className="metric-value">{interview}</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Interview
          </div>
        </div>

        <div className="metric-card metric-offer">
          <span className="metric-value">{offer}</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Offer
          </div>
        </div>

        <div className="metric-card metric-rejected">
          <span className="metric-value">{rejected}</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Rejected
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
