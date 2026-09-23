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
        <div className="content-layout">
          <aside>
            <ApplicationForm />
          </aside>
          <section>
            <ApplicationList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
