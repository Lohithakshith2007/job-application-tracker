import Dashboard from '../components/Dashboard';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationList from '../components/ApplicationList';

function DashboardPage({ applications, onAddApplication, onNavigate }) {
  const recentApplications = applications.slice(0, 3);

  const upcomingInterviews = [
    { id: 1, company: 'Frontend Studio', role: 'React Developer', date: 'Oct 2, 2026', time: '2:00 PM', type: 'Technical Round' },
    { id: 2, company: 'Stripe', role: 'Software Engineer', date: 'Oct 5, 2026', time: '10:30 AM', type: 'System Design' },
  ];

  const savedJobs = [
    { id: 1, company: 'Vercel', role: 'Senior Frontend Engineer', location: 'Remote', salary: '$160k - $190k' },
    { id: 2, company: 'Linear', role: 'Product Designer / Engineer', location: 'San Francisco, CA', salary: '$150k - $180k' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, Alex 👋</h1>
          <p className="page-subtitle">Here is what is happening across your job application pipeline today.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('applications')}>
            View All Applications ({applications.length})
          </button>
        </div>
      </div>

      <Dashboard applications={applications} />

      <div style={{ margin: '32px 0 0' }}>
        <div className="content-layout">
          <aside>
            <ApplicationForm onAddApplication={onAddApplication} />

            {/* Quick Actions Panel */}
            <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
              <h3 style={{ fontSize: '.95rem', fontWeight: 600, marginBottom: '12px' }}>⚡ Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('interviews')}>
                  📅 Schedule Interview Prep
                </button>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('saved-jobs')}>
                  📌 Browse Saved Jobs (2)
                </button>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('analytics')}>
                  📈 View Conversion Report
                </button>
              </div>
            </div>
          </aside>

          <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <ApplicationList applications={applications} />

            {/* Upcoming Interviews Preview */}
            <div className="card" style={{ padding: '24px' }}>
              <div className="section-head" style={{ marginBottom: '16px' }}>
                <div>
                  <h2>Upcoming Interviews</h2>
                  <p>Next scheduled rounds</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('interviews')}>
                  View Calendar →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {upcomingInterviews.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-base)', padding: '14px 16px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                    <div>
                      <h4 style={{ fontSize: '.92rem', fontWeight: 600 }}>{item.role}</h4>
                      <p style={{ fontSize: '.82rem', color: 'var(--tx-2)' }}>{item.company} • {item.type}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-interview">{item.date}</span>
                      <p style={{ fontSize: '.78rem', color: 'var(--tx-3)', marginTop: '4px' }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
