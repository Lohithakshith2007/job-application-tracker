import ApplicationCard from './ApplicationCard';

function ApplicationList({ applications }) {
  return (
    <div className="list-section">
      <div className="list-header">
        <div>
          <h2>Your Applications</h2>
          <p>Overview of all submitted job applications</p>
        </div>
        <span className="badge-count">{applications.length} Jobs</span>
      </div>

      <div className="cards-container">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            company={app.company}
            role={app.role}
            status={app.status}
            date={app.date}
            notes={app.notes}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplicationList;
