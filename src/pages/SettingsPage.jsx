import { useRef, useState } from 'react';
import { parseAppDataBackup } from '../data/appData';

const settingsTabs = [
  { id: 'profile', label: 'General Profile' },
  { id: 'notifications', label: 'Notification Preferences' },
  { id: 'display', label: 'Display & Appearance' },
  { id: 'backup', label: 'Data Export / Backup' },
];

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

function SettingsPage({ profile, preferences, appData, onSave, onImport }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [formProfile, setFormProfile] = useState(profile);
  const [formPreferences, setFormPreferences] = useState(preferences);
  const [saveMessage, setSaveMessage] = useState('');
  const [importError, setImportError] = useState('');
  const importInput = useRef(null);

  function togglePreference(name) {
    setFormPreferences((current) => ({ ...current, [name]: !current[name] }));
  }

  function savePreferences() {
    onSave({ profile: formProfile, preferences: formPreferences });
    setSaveMessage('Preferences saved on this device.');
  }

  function exportBackup() {
    const backup = JSON.stringify({ ...appData, schemaVersion: 1, updatedAt: new Date().toISOString() }, null, 2);
    const downloadUrl = URL.createObjectURL(new Blob([backup], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `job-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  }

  async function importBackup(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedData = parseAppDataBackup(await file.text());
      onImport(importedData);
      setFormProfile(importedData.profile);
      setFormPreferences(importedData.preferences);
      setImportError('');
      setSaveMessage('Backup restored.');
      setActiveTab('profile');
    } catch (error) {
      setImportError(error.message || 'This backup file could not be read.');
    } finally {
      event.target.value = '';
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings & Profile</h1>
          <p className="page-subtitle">Manage your profile, preferences, and local data backup.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-menu" aria-label="Settings sections">
          {settingsTabs.map((tab) => (
            <button key={tab.id} className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Profile Information</h3>
            <div className="field"><label htmlFor="profile-name">Full Name</label><input id="profile-name" className="input-base" type="text" placeholder="Alex Rivera" value={formProfile.fullName} onChange={(event) => setFormProfile((current) => ({ ...current, fullName: event.target.value }))} /></div>
            <div className="field"><label htmlFor="profile-role">Target Role Title</label><input id="profile-role" className="input-base" type="text" placeholder="Senior Frontend Engineer" value={formProfile.targetRole} onChange={(event) => setFormProfile((current) => ({ ...current, targetRole: event.target.value }))} /></div>
          </div>}

          {activeTab === 'notifications' && <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Notification Preferences</h3>
            <PreferenceToggle label="Email Reminders" description="Preference for reminders before upcoming interviews" checked={formPreferences.emailNotifs} onChange={() => togglePreference('emailNotifs')} />
            <PreferenceToggle label="Weekly Progress Digest" description="Preference for a weekly summary of your application metrics" checked={formPreferences.weeklyDigest} onChange={() => togglePreference('weeklyDigest')} />
          </div>}

          {activeTab === 'display' && <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Display & Appearance</h3>
            <PreferenceToggle label="Compact Card View" description="Use a denser layout for application lists" checked={formPreferences.compactCards} onChange={() => togglePreference('compactCards')} />
          </div>}

          {activeTab === 'backup' && <div className="setting-group">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Local Data Backup</h3>
            <p className="settings-help">Your applications, saved jobs, interviews, profile, and preferences are stored in this browser. Export a backup before clearing browser data or changing devices.</p>
            <div className="backup-actions">
              <button className="btn btn-secondary" onClick={exportBackup}>Download Backup</button>
              <button className="btn btn-secondary" onClick={() => importInput.current?.click()}>Restore from Backup</button>
              <input ref={importInput} type="file" accept="application/json,.json" onChange={importBackup} hidden />
            </div>
            <p className="settings-help">Restoring a backup replaces the records currently saved in this browser.</p>
            {importError && <p className="settings-error" role="alert">{importError}</p>}
          </div>}

          <div className="settings-save-row">
            {saveMessage && <p role="status" className="settings-save-message">{saveMessage}</p>}
            {activeTab !== 'backup' && <button className="btn btn-primary" style={{ width: 'auto' }} onClick={savePreferences}>Save Preferences</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
