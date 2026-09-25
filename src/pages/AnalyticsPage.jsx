function AnalyticsPage({ applications = [] }) {
  const total = applications.length || 4;
  const applied = applications.filter(a => a.status === 'Applied').length || 2;
  const interview = applications.filter(a => a.status === 'Interview').length || 1;
  const offer = applications.filter(a => a.status === 'Offer').length || 1;
  const rejected = applications.filter(a => a.status === 'Rejected').length || 0;

  const interviewRate = Math.round(((interview + offer) / total) * 100) || 50;
  const offerRate = Math.round((offer / total) * 100) || 25;

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
                <span>{applied} ({Math.round((applied/total)*100)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-applied" style={{ width: `${(applied/total)*100}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Interview</span>
                <span>{interview} ({Math.round((interview/total)*100)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-interview" style={{ width: `${(interview/total)*100}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Offer</span>
                <span>{offer} ({Math.round((offer/total)*100)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-offer" style={{ width: `${(offer/total)*100}%` }}></div>
              </div>
            </div>

            <div className="bar-row">
              <div className="bar-label">
                <span>Rejected</span>
                <span>{rejected} ({Math.round((rejected/total)*100)}%)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-rejected" style={{ width: `${(rejected/total)*100}%` }}></div>
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
