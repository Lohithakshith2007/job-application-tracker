function ApplicationForm() {
  return (
    <div className="form-panel">
      <div className="panel-header">
        <h2>New Application</h2>
        <p>Track a new job opportunity</p>
      </div>

      <form className="product-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div className="form-field">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            placeholder="e.g. Senior Engineer"
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="date">Date Applied</label>
          <input type="date" id="date" />
        </div>

        <div className="form-field">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows="3"
            placeholder="Key contacts, referral info..."
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
