import { useState } from 'react';

function ApplicationForm({ onAddApplication }) {
  // One piece of state per field — React tracks exactly what the user types
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Don't submit if the two required fields are empty
    if (!company.trim() || !role.trim()) return;

    // Pass the new application up to App.jsx via the prop function
    onAddApplication({ company, role, status, date, notes });

    // Reset all fields back to empty after submitting
    setCompany('');
    setRole('');
    setStatus('Applied');
    setDate('');
    setNotes('');
  }

  return (
    <div className="form-panel">
      <div className="panel-header">
        <h2>New Application</h2>
        <p>Track a new job opportunity</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="e.g. Acme Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            placeholder="e.g. Senior Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="date">Date Applied</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows="3"
            placeholder="Key contacts, referral info..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary">
          Save Application
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
