import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import './App.css';

const initialApplications = [
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

function App() {
  const [applications, setApplications] = useState(initialApplications);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-container">
        <Dashboard applications={applications} />
        <div className="content-layout">
          <aside>
            <ApplicationForm />
          </aside>
          <section>
            <ApplicationList applications={applications} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
