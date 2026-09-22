function ApplicationForm() {
  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Add New Application</h2>
        <p>Enter job details below</p>
      </div>

      <form className="application-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            placeholder="e.g. Google, Stripe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role</label>
          <input
            type="text"
            id="role"
            placeholder="e.g. React Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Application Date</label>
          <input type="date" id="date" />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows="3"
            placeholder="e.g. Referral link used, follow up next week..."
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          + Add Application
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
