import { useState } from 'react';
import AppNav from './components/AppNav';
import LandingPage from './components/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import { SavedJobsPage, InterviewsPage, AnalyticsPage, SettingsPage } from './pages/InnerPages';
import './App.css';
import './pages.css';

const initialApplications = [
  { id: 1, company: 'Frontend Studio', role: 'React Developer', status: 'Interview', date: '2026-09-15', notes: 'Passed technical screening. Final round scheduled next Tuesday.' },
  { id: 2, company: 'TechCorp Labs', role: 'Junior Frontend Engineer', status: 'Offer', date: '2026-09-10', notes: 'Received offer letter. Reviewing compensation.' },
  { id: 3, company: 'CloudScale Solutions', role: 'Full Stack Engineer', status: 'Applied', date: '2026-09-20', notes: 'Applied via company portal with employee referral.' },
  { id: 4, company: 'DesignCraft Inc.', role: 'UI Developer', status: 'Applied', date: '2026-09-22', notes: 'Submitted portfolio along with application form.' },
];

function App() {
  const [view, setView] = useState('landing');
  const [activePage, setActivePage] = useState('dashboard');
  const [applications, setApplications] = useState(initialApplications);

  function addApplication(newApp) {
    setApplications([{ ...newApp, id: Date.now() }, ...applications]);
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('app')} />;
  }

  let pageContent;
  switch (activePage) {
    case 'dashboard':
      pageContent = <DashboardPage applications={applications} onAddApplication={addApplication} onNavigate={setActivePage} />;
      break;
    case 'applications':
      pageContent = <ApplicationsPage applications={applications} onAddApplication={addApplication} />;
      break;
    case 'saved-jobs':
      pageContent = <SavedJobsPage />;
      break;
    case 'interviews':
      pageContent = <InterviewsPage />;
      break;
    case 'analytics':
      pageContent = <AnalyticsPage applications={applications} />;
      break;
    case 'settings':
      pageContent = <SettingsPage />;
      break;
    default:
      pageContent = <DashboardPage applications={applications} onAddApplication={addApplication} onNavigate={setActivePage} />;
  }

  return (
    <div className="app-shell">
      <AppNav
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenLanding={() => setView('landing')}
      />
      <main className="app-main">
        {pageContent}
      </main>
    </div>
  );
}

export default App;
