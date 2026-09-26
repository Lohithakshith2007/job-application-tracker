export const APP_DATA_STORAGE_KEY = 'job-application-tracker:data:v1';

export const DEFAULT_APP_DATA = {
  schemaVersion: 1,
  applications: [
    { id: 1, company: 'Frontend Studio', role: 'React Developer', status: 'Interview', date: '2026-09-15', notes: 'Passed technical screening. Final round scheduled next Tuesday.' },
    { id: 2, company: 'TechCorp Labs', role: 'Junior Frontend Engineer', status: 'Offer', date: '2026-09-10', notes: 'Received offer letter. Reviewing compensation.' },
    { id: 3, company: 'CloudScale Solutions', role: 'Full Stack Engineer', status: 'Applied', date: '2026-09-20', notes: 'Applied via company portal with employee referral.' },
    { id: 4, company: 'DesignCraft Inc.', role: 'UI Developer', status: 'Applied', date: '2026-09-22', notes: 'Submitted portfolio along with application form.' },
  ],
  savedJobs: [
    { id: 1, company: 'Vercel', role: 'Senior Frontend Engineer', location: 'Remote (US/EU)', salary: '$160,000 - $190,000', tags: ['React', 'Next.js', 'TypeScript'], posted: '2 days ago' },
    { id: 2, company: 'Linear', role: 'Product Engineer', location: 'San Francisco, CA', salary: '$170,000 - $200,000', tags: ['React', 'GraphQL', 'Electron'], posted: '4 days ago' },
    { id: 3, company: 'Supabase', role: 'Developer Advocate', location: 'Remote', salary: '$140,000 - $170,000', tags: ['PostgreSQL', 'Technical Writing', 'Open Source'], posted: '1 week ago' },
    { id: 4, company: 'Raycast', role: 'Extension Engineer', location: 'London, UK / Remote', salary: '£90,000 - £110,000', tags: ['Node.js', 'Swift', 'React'], posted: '3 days ago' },
  ],
  interviews: [
    {
      id: 1,
      company: 'Frontend Studio',
      role: 'React Developer',
      date: '2026-10-02',
      day: '02',
      month: 'Oct',
      time: '2:00 PM - 3:00 PM EST',
      type: 'Technical Interview',
      interviewer: 'Sarah Jenkins (Tech Lead)',
      location: 'Google Meet',
      notes: 'Be ready to discuss custom React hooks, state management patterns, and performance optimization.',
      status: 'Upcoming'
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Software Engineer',
      date: '2026-10-05',
      day: '05',
      month: 'Oct',
      time: '10:30 AM - 11:30 AM PST',
      type: 'System Design Round',
      interviewer: 'David Chen (Staff Engineer)',
      location: 'Zoom Link',
      notes: 'Focus on API design, idempotent endpoints, and database caching strategies.',
      status: 'Upcoming'
    },
    {
      id: 3,
      company: 'TechCorp Labs',
      role: 'Junior Frontend Engineer',
      date: '2026-09-18',
      day: '18',
      month: 'Sep',
      time: '1:00 PM EST',
      type: 'HR Screening',
      interviewer: 'Emily Watson (Talent Acquisition)',
      location: 'Phone Call',
      notes: 'Discussed salary expectations and start date timeline.',
      status: 'Completed'
    }
  ],
  profile: {
    fullName: '',
    targetRole: '',
  },
  preferences: {
    emailNotifs: true,
    weeklyDigest: false,
    compactCards: false,
  },
};

function copyDefaultAppData() {
  return JSON.parse(JSON.stringify(DEFAULT_APP_DATA));
}

export function normalizeAppData(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('The backup must contain a JSON object.');
  }

  if (value.schemaVersion !== undefined && value.schemaVersion !== 1) {
    throw new Error('This backup uses an unsupported data version.');
  }

  for (const collection of ['applications', 'savedJobs', 'interviews']) {
    if (!Array.isArray(value[collection])) {
      throw new Error(`The backup is missing a valid ${collection} list.`);
    }

    value[collection].forEach((record, index) => {
      if (!record || typeof record !== 'object' || Array.isArray(record)) {
        throw new Error(`The backup has an invalid entry in ${collection} at row ${index + 1}.`);
      }
      if (record.id === undefined || record.id === null) {
        throw new Error(`Every ${collection} entry needs an id.`);
      }
      if (typeof record.company !== 'string' || typeof record.role !== 'string') {
        throw new Error(`Every ${collection} entry needs a company and role.`);
      }
    });
  }

  if (value.profile !== undefined && (!value.profile || typeof value.profile !== 'object' || Array.isArray(value.profile))) {
    throw new Error('The backup contains an invalid profile.');
  }
  if (value.preferences !== undefined && (!value.preferences || typeof value.preferences !== 'object' || Array.isArray(value.preferences))) {
    throw new Error('The backup contains invalid preferences.');
  }

  const defaults = copyDefaultAppData();
  return {
    schemaVersion: 1,
    applications: value.applications.map((application) => ({
      ...application,
      status: typeof application.status === 'string' ? application.status : 'Applied',
      date: typeof application.date === 'string' ? application.date : '',
      notes: typeof application.notes === 'string' ? application.notes : '',
    })),
    savedJobs: value.savedJobs.map((job) => ({
      ...job,
      location: typeof job.location === 'string' ? job.location : '',
      salary: typeof job.salary === 'string' ? job.salary : '',
      posted: typeof job.posted === 'string' ? job.posted : '',
      tags: Array.isArray(job.tags) ? job.tags : [],
    })),
    interviews: value.interviews.map((interview) => ({
      ...interview,
      date: typeof interview.date === 'string' ? interview.date : '',
      day: typeof interview.day === 'string' ? interview.day : '',
      month: typeof interview.month === 'string' ? interview.month : '',
      time: typeof interview.time === 'string' ? interview.time : '',
      type: typeof interview.type === 'string' ? interview.type : 'Interview',
      interviewer: typeof interview.interviewer === 'string' ? interview.interviewer : '',
      location: typeof interview.location === 'string' ? interview.location : '',
      notes: typeof interview.notes === 'string' ? interview.notes : '',
      status: typeof interview.status === 'string' ? interview.status : 'Upcoming',
    })),
    profile: { ...defaults.profile, ...(value.profile || {}) },
    preferences: { ...defaults.preferences, ...(value.preferences || {}) },
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null,
  };
}

export function readAppData() {
  try {
    const serialized = window.localStorage.getItem(APP_DATA_STORAGE_KEY);
    if (!serialized) {
      return { data: copyDefaultAppData(), error: '', shouldInitialize: true };
    }

    return { data: normalizeAppData(JSON.parse(serialized)), error: '', shouldInitialize: false };
  } catch (error) {
    const message = error instanceof SyntaxError || error instanceof TypeError
      ? 'Saved data could not be read. Your existing browser data has been left untouched.'
      : error?.message || 'Browser storage is unavailable. Changes may not be saved.';
    return { data: copyDefaultAppData(), error: message, shouldInitialize: false };
  }
}

export function parseAppDataBackup(serialized) {
  return normalizeAppData(JSON.parse(serialized));
}
