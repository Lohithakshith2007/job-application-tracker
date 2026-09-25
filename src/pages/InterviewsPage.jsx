import { useState } from 'react';

const initialInterviews = [
  {
    id: 1,
    company: 'Frontend Studio',
    role: 'React Developer',
    date: '2026-10-02',
    day: '02',
    month: 'Oct',
    time: '2:00 PM - 3:00 PM EST',
    type: 'Technical Interview',
    interviewer: 'Sarah Jenkins (Tech Lead)',
    location: 'Google Meet',
    notes: 'Be ready to discuss custom React hooks, state management patterns, and performance optimization.',
    status: 'Upcoming'
  },
  {
    id: 2,
    company: 'Stripe',
    role: 'Software Engineer',
    date: '2026-10-05',
    day: '05',
    month: 'Oct',
    time: '10:30 AM - 11:30 AM PST',
    type: 'System Design Round',
    interviewer: 'David Chen (Staff Engineer)',
    location: 'Zoom Link',
    notes: 'Focus on API design, idempotent endpoints, and database caching strategies.',
    status: 'Upcoming'
  },
  {
    id: 3,
    company: 'TechCorp Labs',
    role: 'Junior Frontend Engineer',
    date: '2026-09-18',
    day: '18',
    month: 'Sep',
    time: '1:00 PM EST',
    type: 'HR Screening',
    interviewer: 'Emily Watson (Talent Acquisition)',
    location: 'Phone Call',
    notes: 'Discussed salary expectations and start date timeline.',
    status: 'Completed'
  }
];

function InterviewsPage() {
  const [interviews] = useState(initialInterviews);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Interviews</h1>
          <p className="page-subtitle">Schedule, track, and prepare for upcoming interview rounds.</p>
        </div>
        <button className="btn btn-primary btn-sm">
          + Add Interview
        </button>
      </div>

      <div className="interviews-list">
        {interviews.map((item) => (
          <div key={item.id} className="interview-card">
            <div className="interview-date-box">
              <span className="date-day">{item.day}</span>
              <span className="date-month">{item.month}</span>
            </div>

            <div className="interview-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3>{item.role}</h3>
                <span className="card-company">at {item.company}</span>
              </div>

              <div className="interview-time-type">
                <span>⏰ {item.time}</span>
                <span>•</span>
                <span>🎥 {item.location}</span>
                <span>•</span>
                <span>👤 {item.interviewer}</span>
              </div>

              {item.notes && (
                <p className="card-notes" style={{ marginTop: '10px' }}>
                  💡 {item.notes}
                </p>
              )}
            </div>

            <div className="interview-status">
              <span className={`badge ${item.status === 'Upcoming' ? 'badge-interview' : 'badge-applied'}`}>
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewsPage;
