import { useState } from 'react';

function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [compactCards, setCompactCards] = useState(false);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings & Profile</h1>
          <p className="page-subtitle">Manage your account preferences and app configurations.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-menu">
          <button className="settings-tab active">General Profile</button>
          <button className="settings-tab">Notification Preferences</button>
          <button className="settings-tab">Display & Appearance</button>
          <button className="settings-tab">Data Export / Backup</button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Profile Information</h3>
            <div className="field">
              <label>Full Name</label>
              <input type="text" defaultValue="Alex Rivera" />
            </div>
            <div className="field">
              <label>Target Role Title</label>
              <input type="text" defaultValue="Senior Frontend Engineer" />
            </div>
          </div>

          <div className="divider"></div>

          <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>App Preferences</h3>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>Email Reminders</h4>
                <p>Receive alerts before upcoming interviews</p>
              </div>
              <div
                className={`toggle-sw ${emailNotifs ? 'on' : ''}`}
                onClick={() => setEmailNotifs(!emailNotifs)}
              ></div>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <h4>Weekly Progress Digest</h4>
                <p>Get a Sunday summary of your application metrics</p>
              </div>
              <div
                className={`toggle-sw ${weeklyDigest ? 'on' : ''}`}
                onClick={() => setWeeklyDigest(!weeklyDigest)}
              ></div>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <h4>Compact Card View</h4>
                <p>Use denser layout for application lists</p>
              </div>
              <div
                className={`toggle-sw ${compactCards ? 'on' : ''}`}
                onClick={() => setCompactCards(!compactCards)}
              ></div>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <button className="btn btn-primary" style={{ width: 'auto' }}>
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
