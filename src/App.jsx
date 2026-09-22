import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-container">
        <Dashboard />
        <div className="content-grid">
          <aside className="form-column">
            <ApplicationForm />
          </aside>
          <section className="list-column">
            <ApplicationList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
