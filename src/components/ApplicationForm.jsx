import { useState } from 'react';
import NotesField from './NotesField';

const emptyApplication = {
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    notes: ''
};

function ApplicationForm({ onAddApplication, onUpdateApplication, initialData, onCancel, showHeader = true }) {
  const [formData, setFormData] = useState(() => initialData ? { ...emptyApplication, ...initialData } : emptyApplication);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;
    
    if (initialData) {
      onUpdateApplication(initialData.id, formData);
      onCancel?.();
      return;
    }

    onAddApplication(formData);
    setFormData(emptyApplication);
  };

  return (
    <div className="premium-form-panel">
      <div className="pfp-glow"></div>
      <div className="pfp-inner">
        {showHeader && <div className="pfp-header">
          <h3>{initialData ? 'Edit Application' : 'Log New Application'}</h3>
          <p>{initialData ? 'Update the saved details for this application.' : 'Track a new role in your pipeline.'}</p>
        </div>}

        <form onSubmit={handleSubmit} className="pfp-form">
          <div className="pfp-fieldgroup">
            <div className="pfp-field">
              <label>Company Name <span className="req">*</span></label>
              <input type="text" name="company" maxLength={120} placeholder="Vercel, Stripe" value={formData.company} onChange={handleChange} required />
            </div>
            
            <div className="pfp-field">
              <label>Role / Title <span className="req">*</span></label>
              <input type="text" name="role" maxLength={160} placeholder="Frontend Engineer" value={formData.role} onChange={handleChange} required />
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
              <label htmlFor="application-date">Interaction Date</label>
              <input id="application-date" className="date-input" type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <NotesField
            id="application-notes"
            className="pfp-field"
            label="Preparation Notes & Links"
            placeholder="Add a short reminder or job link..."
            value={formData.notes}
            onChange={handleChange}
          />

          {onCancel ? (
            <div className="application-form-actions">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              <button type="submit" className="pfp-submit-btn">Save Changes</button>
            </div>
          ) : (
            <button type="submit" className="pfp-submit-btn">
              Save Application
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
