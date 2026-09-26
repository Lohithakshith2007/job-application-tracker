import { useState } from 'react';

function ApplicationForm({ onAddApplication }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;
    
    onAddApplication(formData);
    setFormData({  company: '', role: '', status: 'Applied', date: '', notes: '' });
  };

  return (
    <div className="premium-form-panel">
      <div className="pfp-glow"></div>
      <div className="pfp-inner">
        <div className="pfp-header">
          <h3>Log New Application</h3>
          <p>Track a new role in your pipeline.</p>
        </div>

        <form onSubmit={handleSubmit} className="pfp-form">
          <div className="pfp-fieldgroup">
            <div className="pfp-field">
              <label>Company Name <span className="req">*</span></label>
              <input type="text" name="company" placeholder="Vercel, Stripe" value={formData.company} onChange={handleChange} required />
            </div>
            
            <div className="pfp-field">
              <label>Role / Title <span className="req">*</span></label>
              <input type="text" name="role" placeholder="Frontend Engineer" value={formData.role} onChange={handleChange} required />
            </div>
          </div>

          <div className="pfp-fieldgroup">
            <div className="pfp-field">
              <label>Current Status</label>
              <div className="pfp-select-wrap">
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer / Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="pfp-select-caret">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            <div className="pfp-field">
              <label>Interaction Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <div className="pfp-field">
            <label>Preparation Notes & Links</label>
            <textarea name="notes" placeholder="Paste job description URL, referral contact, or prep notes here..." rows="3" value={formData.notes} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="pfp-submit-btn">
            Save Application
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
