function AnalyticsPage({ applications = [] }) {
  const total = applications.length;
  const applied = applications.filter(a => a.status === 'Applied').length;
  const interview = applications.filter(a => a.status === 'Interview').length;
  const offer = applications.filter(a => a.status === 'Offer').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;

  const percentage = (value) => total ? Math.round((value / total) * 100) : 0;
  const interviewRate = percentage(interview + offer);
  const offerRate = percentage(offer);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Insights and performance metrics for your active job hunt.</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel">
          <h3>Application Status Breakdown</h3>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">
                <span>Applied</span>
                <span>{applied} ({percentage(applied)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-applied" style={{ width: `${percentage(applied)}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Interview</span>
                <span>{interview} ({percentage(interview)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-interview" style={{ width: `${percentage(interview)}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Offer</span>
                <span>{offer} ({percentage(offer)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-offer" style={{ width: `${percentage(offer)}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Rejected</span>
                <span>{rejected} ({percentage(rejected)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-rejected" style={{ width: `${percentage(rejected)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-panel">
          <h3>Conversion Funnel</h3>
          <div className="funnel-list">
            <div className="funnel-item">
              <span className="funnel-name">Interview Conversion Rate</span>
              <span className="funnel-val">{interviewRate}%</span>
            </div>
            <div className="funnel-item">
              <span className="funnel-name">Offer Conversion Rate</span>
              <span className="funnel-val">{offerRate}%</span>
            </div>
            <div className="funnel-item">
              <span className="funnel-name">Active Applications</span>
              <span className="funnel-val">{applied + interview}</span>
            </div>
            <div className="funnel-item">
              <span className="funnel-name">Total Logged</span>
              <span className="funnel-val">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
