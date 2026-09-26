# Job Application Tracker

A React and Vite app for tracking job applications, saved jobs, interviews, profile details, and dashboard metrics.

## Run locally

```sh
npm install
npm run dev
```

## Data storage

The app stores its user data in the browser's `localStorage` under `job-application-tracker:data:v1`. A single versioned record holds:

- Applications and their status, date, and notes
- Saved jobs and their company, role, location, salary, tags, and posting age
- Interviews and their date, time, type, interviewer, location, status, and notes
- Profile fields and app preferences

Changes from the dashboard, applications, saved jobs, interviews, and settings all update that shared record. Dashboard counts and upcoming interviews are derived from the same data. The record is loaded when the app starts, so it survives refreshes in the same browser profile.

Use **Settings → Data Export / Backup** to download a JSON backup or restore one. Restoring replaces the records currently in the browser. The app starts with the sample records when no saved record exists yet.

This is device-local storage: it does not sync to an account or between browsers. Clearing site data or switching devices removes access to that browser's copy, so export a backup when you need one. Avoid storing passwords, access tokens, or other secrets here.

## Build

```sh
npm run build
```
