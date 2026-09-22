function Dashboard() {
  return (
    <section className="dashboard">
      <div className="stat-card stat-total">
        <span className="stat-icon">📊</span>
        <div className="stat-info">
          <h3>Total Applications</h3>
          <p className="stat-number">4</p>
        </div>
      </div>

      <div className="stat-card stat-applied">
        <span className="stat-icon">📩</span>
        <div className="stat-info">
          <h3>Applied</h3>
          <p className="stat-number">2</p>
        </div>
      </div>

      <div className="stat-card stat-interview">
        <span className="stat-icon">🎙️</span>
        <div className="stat-info">
          <h3>Interview</h3>
          <p className="stat-number">1</p>
        </div>
      </div>

      <div className="stat-card stat-offer">
        <span className="stat-icon">🎉</span>
        <div className="stat-info">
          <h3>Offer</h3>
          <p className="stat-number">1</p>
        </div>
      </div>

      <div className="stat-card stat-rejected">
        <span className="stat-icon">❌</span>
        <div className="stat-info">
          <h3>Rejected</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
