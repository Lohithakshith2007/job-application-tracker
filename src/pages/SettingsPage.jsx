import { useState } from 'react';

function PreferenceToggle({ label, description, checked, onChange }) {
  return (
    <div className="setting-row">
      <div className="setting-info"><h4>{label}</h4><p>{description}</p></div>
      <button
        type="button"
        className={`toggle-sw ${checked ? 'on' : ''}`}
        role="switch"
        aria-label={label}
        aria-checked={checked}
        onClick={onChange}
      />
    </div>
  );
}

function SettingsPage({ profile, preferences, onSave }) {
  const [formProfile, setFormProfile] = useState(profile);
  const [formPreferences, setFormPreferences] = useState(preferences);
  const [saveMessage, setSaveMessage] = useState('');

  function togglePreference(name) {
    setFormPreferences((current) => ({ ...current, [name]: !current[name] }));
  }

  function saveSettings() {
    onSave({ profile: formProfile, preferences: formPreferences });
    setSaveMessage('Preferences saved on this device.');
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings & Profile</h1>
          <p className="page-subtitle">Manage your profile and app preferences.</p>
        </div>
      </div>

      <div className="settings-content">
        <div className="setting-group">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Profile Information</h3>
          <div className="field">
            <label htmlFor="profile-name">Full Name</label>
            <input id="profile-name" className="input-base" type="text" maxLength={80} placeholder="Alex Rivera" value={formProfile.fullName} onChange={(event) => setFormProfile((current) => ({ ...current, fullName: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="profile-role">Target Role Title</label>
            <input id="profile-role" className="input-base" type="text" maxLength={100} placeholder="Senior Frontend Engineer" value={formProfile.targetRole} onChange={(event) => setFormProfile((current) => ({ ...current, targetRole: event.target.value }))} />
          </div>
        </div>

        <div className="divider" />

        <div className="setting-group">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>App Preferences</h3>
          <PreferenceToggle label="Email Reminders" description="Preference for reminders before upcoming interviews" checked={formPreferences.emailNotifs} onChange={() => togglePreference('emailNotifs')} />
          <PreferenceToggle label="Weekly Progress Digest" description="Preference for a weekly summary of your application metrics" checked={formPreferences.weeklyDigest} onChange={() => togglePreference('weeklyDigest')} />
          <PreferenceToggle label="Compact Card View" description="Use a denser layout for application lists" checked={formPreferences.compactCards} onChange={() => togglePreference('compactCards')} />
        </div>

        <div className="settings-save-row">
          {saveMessage && <p role="status" className="settings-save-message">{saveMessage}</p>}
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={saveSettings}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
