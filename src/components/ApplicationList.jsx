import ApplicationCard from './ApplicationCard';

function ApplicationList() {
  // Static sample data for demonstration in Version 1
  const sampleApplications = [
    {
      id: 1,
      company: 'Frontend Studio',
      role: 'React Developer',
      status: 'Interview',
      date: '2026-09-15',
      notes: 'Passed technical screening. Final round scheduled for next Tuesday.',
    },
    {
      id: 2,
      company: 'TechCorp Labs',
      role: 'Junior Frontend Engineer',
      status: 'Offer',
      date: '2026-09-10',
      notes: 'Received offer letter. Reviewing compensation package.',
    },
    {
      id: 3,
      company: 'CloudScale Solutions',
      role: 'Full Stack Engineer',
      status: 'Applied',
      date: '2026-09-20',
      notes: 'Applied via company portal with employee referral.',
    },
    {
      id: 4,
      company: 'DesignCraft Inc.',
      role: 'UI Developer',
      status: 'Applied',
      date: '2026-09-22',
      notes: 'Submitted portfolio along with application form.',
    },
  ];

  return (
    <div className="list-section">
      <div className="list-header">
        <div>
          <h2>Your Applications</h2>
          <p>Overview of all submitted job applications</p>
        </div>
        <span className="badge-count">{sampleApplications.length} Jobs</span>
      </div>

      <div className="cards-container">
        {sampleApplications.map((app) => (
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
