# Job Application Tracker

A React and Vite app for tracking job applications, saved jobs, interviews, profile details, and dashboard metrics.

## Run locally

```sh
npm install
npm run dev
```

## Data storage

The app stores its user data in the browser's `localStorage` under `job-application-tracker:data:v1`. One small JSON record holds:

- Applications and their status, date, and notes
- Saved jobs and their company, role, location, salary, tags, and posting age
- Interviews and their date, time, type, interviewer, location, status, and notes
- Profile fields and app preferences

New installs start with empty applications, saved jobs, and interviews. No demo records are written. The app loads saved data at startup and saves after a user changes a record or setting. Dashboard counts and upcoming interviews are derived from those same records.

The first load after updating from the demo build removes the old numeric-ID sample rows and keeps records added through the app.

The app keeps its saved JSON below an estimated 4 MiB to leave room under the common 5 MiB browser limit. Browsers differ, so it also handles storage write errors. Notes are limited to 50 characters; do not store attachments, images, or full job descriptions here.

This is device-local storage: it does not sync to an account or between browsers. Clearing site data or switching devices removes access to that browser's copy. Avoid storing passwords, access tokens, or other secrets here.

## Build

```sh
npm run build
```
