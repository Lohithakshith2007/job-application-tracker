import { useState } from 'react';
import AppNav from './components/AppNav';
import LandingPage from './components/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import InterviewsPage from './pages/InterviewsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import { useAppData } from './hooks/useAppData';
import { limitNoteText } from './data/appData';
import './App.css';
import './pages.css';

function createId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function toInterviewDateParts(date) {
  if (!date) return { day: '', month: '' };
  const parsedDate = new Date(`${date}T12:00:00`);
  return {
    day: parsedDate.toLocaleDateString(undefined, { day: '2-digit' }),
    month: parsedDate.toLocaleDateString(undefined, { month: 'short' }),
  };
}

function App() {
  const [view, setView] = useState('app');
  const [activePage, setActivePage] = useState('dashboard');
  const { appData, updateAppData, clearAppData, storageError } = useAppData();
  const { applications, savedJobs, interviews, profile, preferences } = appData;

  function addApplication(newApp) {
    updateAppData((current) => ({
      ...current,
      applications: [{ ...newApp, notes: limitNoteText(newApp.notes), id: createId(), date: newApp.date || new Date().toISOString().slice(0, 10) }, ...current.applications],
    }));
  }

  function updateApplication(id, changes) {
    updateAppData((current) => ({
      ...current,
      applications: current.applications.map((application) => (
        application.id === id
          ? { ...application, ...changes, notes: limitNoteText(changes.notes ?? application.notes) }
          : application
      )),
    }));
  }

  function deleteApplication(id) {
    updateAppData((current) => ({
      ...current,
      applications: current.applications.filter((application) => application.id !== id),
    }));
  }

  function addSavedJob(job) {
    updateAppData((current) => ({
      ...current,
      savedJobs: [{ ...job, id: createId() }, ...current.savedJobs],
    }));
  }

  function deleteSavedJob(id) {
    updateAppData((current) => ({
      ...current,
      savedJobs: current.savedJobs.filter((job) => job.id !== id),
    }));
  }

  function addInterview(interview) {
    updateAppData((current) => ({
      ...current,
      interviews: [{ ...interview, notes: limitNoteText(interview.notes), ...toInterviewDateParts(interview.date), id: createId() }, ...current.interviews],
    }));
  }

  function deleteInterview(id) {
    updateAppData((current) => ({
      ...current,
      interviews: current.interviews.filter((interview) => interview.id !== id),
    }));
  }

  function saveSettings(nextSettings) {
    updateAppData((current) => ({ ...current, ...nextSettings }));
  }

  function showLandingPage() {
    setView('landing');
  }

  function showApp() {
    setActivePage('dashboard');
    setView('app');
  }

  function logOut() {
    if (!clearAppData()) return false;
    setActivePage('dashboard');
    setView('landing');
    return true;
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={showApp} />;
  }

  let pageContent;
  switch (activePage) {
    case 'dashboard':
      pageContent = <DashboardPage applications={applications} savedJobs={savedJobs} interviews={interviews} profile={profile} onAddApplication={addApplication} onUpdateApplication={updateApplication} onDeleteApplication={deleteApplication} onNavigate={setActivePage} />;
      break;
    case 'applications':
      pageContent = <ApplicationsPage applications={applications} onUpdateApplication={updateApplication} onDeleteApplication={deleteApplication} />;
      break;
    case 'saved-jobs':
      pageContent = <SavedJobsPage jobs={savedJobs} onAddJob={addSavedJob} onDeleteJob={deleteSavedJob} onAddApplication={addApplication} />;
      break;
    case 'interviews':
      pageContent = <InterviewsPage interviews={interviews} onAddInterview={addInterview} onDeleteInterview={deleteInterview} />;
      break;
    case 'analytics':
      pageContent = <AnalyticsPage applications={applications} />;
      break;
    case 'settings':
      pageContent = <SettingsPage profile={profile} preferences={preferences} onSave={saveSettings} />;
      break;
    default:
      pageContent = <DashboardPage applications={applications} savedJobs={savedJobs} interviews={interviews} profile={profile} onAddApplication={addApplication} onUpdateApplication={updateApplication} onDeleteApplication={deleteApplication} onNavigate={setActivePage} />;
  }

  return (
    <div className={`app-shell${preferences.compactCards ? ' compact-cards' : ''}`}>
      <AppNav
        activePage={activePage}
        setActivePage={setActivePage}
        profileName={profile.fullName}
        onGoHome={showLandingPage}
        onLogout={logOut}
      />
      <main className="app-main">
        {pageContent}
      </main>
      <div className={`storage-notice${storageError ? ' storage-notice-error' : ''}`} role="status" aria-live="polite">
        {storageError || 'Storage is limited to this browser'}
      </div>
    </div>
  );
}

export default App;
