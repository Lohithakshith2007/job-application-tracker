function Dashboard({ applications }) {
  const total = applications.length;
  const applied = applications.filter(a => a.status === 'Applied').length;
  const interview = applications.filter(a => a.status === 'Interview').length;
  const offer = applications.filter(a => a.status === 'Offer').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;

  return (
    <div className="premium-dashboard">
      <div className="pd-metrics-row">
        
        {/* Main large stat */}
        <div className="pd-large-stat">
          <div className="pd-ls-title">Total Active Funnel</div>
          <div className="pd-ls-value">{total} <span className="pd-ls-unit">roles</span></div>
          <div className="pd-ls-chart">
            <div className="pd-ls-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="pd-ls-fill" style={{ width: `${total ? (interview/total)*100 : 0}%`, background: 'var(--interview)' }}></div>
          </div>
          <div className="pd-ls-bot">
            <span>{interview} in interview stages</span>
          </div>
        </div>

        {/* Small stats grid */}
        <div className="pd-small-stats">
          <div className="pd-stat s-applied">
            <div className="pd-st-top">
              <span className="pd-st-dot"></span>
              <span className="pd-st-lbl">Applied</span>
            </div>
            <div className="pd-st-val">{applied}</div>
          </div>

          <div className="pd-stat s-interview">
            <div className="pd-st-top">
              <span className="pd-st-dot"></span>
              <span className="pd-st-lbl">Interviewing</span>
            </div>
            <div className="pd-st-val">{interview}</div>
          </div>

          <div className="pd-stat s-offer">
            <div className="pd-st-top">
              <span className="pd-st-dot"></span>
              <span className="pd-st-lbl">Offers</span>
            </div>
            <div className="pd-st-val">{offer}</div>
          </div>

          <div className="pd-stat s-rejected">
            <div className="pd-st-top">
              <span className="pd-st-dot"></span>
              <span className="pd-st-lbl">Rejected</span>
            </div>
            <div className="pd-st-val">{rejected}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
