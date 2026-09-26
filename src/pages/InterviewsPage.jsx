import { useState } from 'react';

const emptyInterview = {
  company: '',
  role: '',
  date: '',
  time: '',
  type: 'Technical Interview',
  interviewer: '',
  location: '',
  notes: '',
  status: 'Upcoming',
};

function InterviewsPage({ interviews, onAddInterview, onDeleteInterview }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyInterview);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddInterview(formData);
    setFormData(emptyInterview);
    setIsAdding(false);
  }

  const sortedInterviews = [...interviews].sort((first, second) => first.date.localeCompare(second.date));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Interviews</h1>
          <p className="page-subtitle">Schedule, track, and prepare for upcoming interview rounds.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsAdding((current) => !current)}>
          {isAdding ? 'Cancel' : '+ Add Interview'}
        </button>
      </div>

      {isAdding && (
        <form className="data-entry-panel" onSubmit={handleSubmit}>
          <h2>Schedule an interview</h2>
          <div className="data-entry-grid">
            <div className="field"><label htmlFor="interview-company">Company</label><input className="input-base" id="interview-company" name="company" maxLength={120} value={formData.company} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="interview-role">Role</label><input className="input-base" id="interview-role" name="role" maxLength={160} value={formData.role} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="interview-date">Date</label><input className="input-base" id="interview-date" name="date" type="date" value={formData.date} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="interview-time">Time and timezone</label><input className="input-base" id="interview-time" name="time" value={formData.time} onChange={updateField} placeholder="2:00 PM - 3:00 PM EST" /></div>
            <div className="field"><label htmlFor="interview-type">Round type</label><input className="input-base" id="interview-type" name="type" value={formData.type} onChange={updateField} required /></div>
            <div className="field"><label htmlFor="interview-status">Status</label><select className="input-base" id="interview-status" name="status" value={formData.status} onChange={updateField}><option>Upcoming</option><option>Completed</option><option>Cancelled</option></select></div>
            <div className="field"><label htmlFor="interview-interviewer">Interviewer</label><input className="input-base" id="interview-interviewer" name="interviewer" value={formData.interviewer} onChange={updateField} /></div>
            <div className="field"><label htmlFor="interview-location">Location or link</label><input className="input-base" id="interview-location" name="location" value={formData.location} onChange={updateField} placeholder="Google Meet, phone, office" /></div>
            <div className="field data-entry-wide"><label htmlFor="interview-notes">Preparation notes</label><textarea className="input-base" id="interview-notes" name="notes" maxLength={2000} rows="3" value={formData.notes} onChange={updateField} /></div>
          </div>
          <div className="data-entry-actions"><button type="submit" className="btn btn-primary btn-sm">Save Interview</button></div>
        </form>
      )}

      {sortedInterviews.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">🗓️</div><h3>No interviews yet</h3><p>Save an interview to keep its date, details, and preparation notes together.</p></div>
      ) : (
        <div className="interviews-list">
          {sortedInterviews.map((item) => (
            <div key={item.id} className="interview-card">
              <div className="interview-date-box">
                <span className="date-day">{item.day || '—'}</span>
                <span className="date-month">{item.month || 'Date'}</span>
              </div>

              <div className="interview-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3>{item.role}</h3>
                  <span className="card-company">at {item.company}</span>
                </div>

                <div className="interview-time-type">
                  {item.time && <span>⏰ {item.time}</span>}
                  {item.location && <span>🎥 {item.location}</span>}
                  {item.interviewer && <span>👤 {item.interviewer}</span>}
                </div>

                {item.notes && <p className="card-notes">💡 {item.notes}</p>}
              </div>

              <div className="interview-status interview-actions">
                <span className={`badge ${item.status === 'Upcoming' ? 'badge-interview' : 'badge-applied'}`}>{item.type} · {item.status}</span>
                <button className="btn-ghost interview-delete" onClick={() => onDeleteInterview(item.id)} aria-label={`Delete interview for ${item.role} at ${item.company}`} title="Delete interview">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewsPage;
