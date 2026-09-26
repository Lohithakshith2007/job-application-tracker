export const APP_DATA_STORAGE_KEY = 'job-application-tracker:data:v1';

export const EMPTY_APP_DATA = {
  applications: [],
  savedJobs: [],
  interviews: [],
  profile: { fullName: '', targetRole: '' },
  preferences: { emailNotifs: true, weeklyDigest: false, compactCards: false },
};

export function readAppData() {
  try {
    const savedData = window.localStorage.getItem(APP_DATA_STORAGE_KEY);
    if (!savedData) return { data: EMPTY_APP_DATA, error: '' };

    const parsedData = JSON.parse(savedData);
    const wasLegacyDemoVersion = parsedData.schemaVersion === 1;
    const data = {
      applications: Array.isArray(parsedData.applications) ? parsedData.applications : [],
      savedJobs: Array.isArray(parsedData.savedJobs) ? parsedData.savedJobs : [],
      interviews: Array.isArray(parsedData.interviews) ? parsedData.interviews : [],
      profile: { ...EMPTY_APP_DATA.profile, ...parsedData.profile },
      preferences: { ...EMPTY_APP_DATA.preferences, ...parsedData.preferences },
    };

    if (wasLegacyDemoVersion) {
      // The earlier build used numeric IDs for sample records and string IDs for records users added.
      data.applications = data.applications.filter((record) => typeof record.id !== 'number');
      data.savedJobs = data.savedJobs.filter((record) => typeof record.id !== 'number');
      data.interviews = data.interviews.filter((record) => typeof record.id !== 'number');

      try {
        window.localStorage.setItem(APP_DATA_STORAGE_KEY, JSON.stringify(data));
      } catch {
        return { data, error: 'Old demo records were removed in memory, but the browser could not update its saved copy.' };
      }
    }

    return { data, error: '' };
  } catch {
    return {
      data: EMPTY_APP_DATA,
      error: 'Saved data could not be read. It has been left untouched.',
    };
  }
}
