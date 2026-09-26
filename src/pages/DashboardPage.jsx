import Dashboard from '../components/Dashboard';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationList from '../components/ApplicationList';
import ApplicationCard from '../components/ApplicationCard';

function DashboardPage({ applications, savedJobs, interviews, profile, onAddApplication, onUpdateApplication, onDeleteApplication, onNavigate }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcomingInterviews = interviews
    .filter((interview) => interview.status === 'Upcoming' && interview.date >= today)
    .sort((first, second) => first.date.localeCompare(second.date))
    .slice(0, 3);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back{profile.fullName ? `, ${profile.fullName}` : ''}</h1>
          <p className="page-subtitle">{profile.targetRole ? `Your ${profile.targetRole} search at a glance.` : 'Here is what is happening across your job application pipeline today.'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', background: 'var(--bg-elevated)', borderRadius: 'var(--r-full)', border: '1px solid var(--border)' }}>
          <div style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent)' }}></div>
          <span style={{ fontSize: '.85rem', color: 'var(--tx-2)', fontWeight: 500 }}>Saved on this device • {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <Dashboard applications={applications} />

      <div style={{ margin: '32px 0 0' }}>
        <div className="content-layout">
          <aside>
            <ApplicationForm onAddApplication={onAddApplication} />

            {/* Quick Actions Panel */}
            <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
              <h3 style={{ fontSize: '.95rem', fontWeight: 600, marginBottom: '12px' }}> Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('interviews')}>
                   Schedule Interview Prep
                </button>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('saved-jobs')}>
                   Browse Saved Jobs ({savedJobs.length})
                </button>
                <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('analytics')}>
                   View Conversion Report
                </button>
              </div>
            </div>
          </aside>

          <section>
            {/* Recent Activity Grid */}
            <div className="section-head" style={{ marginBottom: '30px' }}>
              <div>
                <h2>Recent Activity</h2>
                <p>Latest updates in your pipeline</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
              {applications.slice(0, 4).map(app => (
                <ApplicationCard key={app.id} app={app} onUpdate={onUpdateApplication} onDelete={onDeleteApplication} />
              ))}
              {applications.length === 0 && <p className="dashboard-empty-copy">Your saved application updates will appear here.</p>}
            </div>

            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '60px', padding: '14px', fontWeight: 500 }} onClick={() => onNavigate('applications')}>
              See all applications ({applications.length}) →
            </button>
          </section>
        </div>

        {/* Full-width Upcoming Interviews Section */}
        <div className="card" style={{ margin: '48px 0 60px', padding: '32px' }}>
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Upcoming Interviews</h2>
              <p>Next scheduled rounds</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('interviews')}>
              View Full Schedule
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {upcomingInterviews.map((item) => (
              <div key={item.id} className="interview-row" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', alignItems: 'center', background: 'var(--bg-base)', padding: '20px 24px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                {/* Left: Role and Company */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--tx-1)', marginBottom: '4px' }}>{item.role}</h4>
                  <p style={{ fontSize: '.85rem', color: 'var(--tx-2)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-light)' }}>{item.company}</span> • {item.type}
                  </p>
                </div>

                {/* Middle: Added Impressive Details */}
                <div style={{ display: 'flex', gap: '40px' }}>
                  <div>
                    <span style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--tx-3)' }}>Location</span>
                    <p style={{ fontSize: '.85rem', fontWeight: 500, marginTop: '2px' }}>{item.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--tx-3)' }}>Interviewer</span>
                    <p style={{ fontSize: '.85rem', fontWeight: 500, marginTop: '2px' }}>{item.interviewer || 'Not specified'}</p>
                  </div>
                </div>

                {/* Right: Date and Time */}
                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{ background: 'var(--interview-bg)', color: 'var(--interview)', padding: '6px 12px', fontSize: '.75rem', fontWeight: 600, borderRadius: 'var(--r-full)' }}>
                    {item.date ? new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                  </span>
                  <p style={{ fontSize: '.8rem', color: 'var(--tx-2)', marginTop: '8px', fontWeight: 500 }}>{item.time}</p>
                </div>
              </div>
            ))}
            {upcomingInterviews.length === 0 && <p className="dashboard-empty-copy">No upcoming interviews. Add one to see it on your dashboard.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
