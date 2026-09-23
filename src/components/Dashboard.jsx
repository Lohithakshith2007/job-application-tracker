function Dashboard() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <p>Your job application pipeline at a glance</p>
      </div>
      <div className="metrics-grid">
        <div className="metric-card metric-total">
          <span className="metric-value">4</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Total Applications
          </div>
        </div>

        <div className="metric-card metric-applied">
          <span className="metric-value">2</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Applied
          </div>
        </div>

        <div className="metric-card metric-interview">
          <span className="metric-value">1</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Interview
          </div>
        </div>

        <div className="metric-card metric-offer">
          <span className="metric-value">1</span>
          <div className="metric-label">
            <span className="metric-indicator"></span>
            Offer
          </div>
        </div>

        <div className="metric-card metric-rejected">
          <span className="metric-value">0</span>
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
