# Contact Management App with Charts and Maps

This is a Contact Management app built using ReactJS, TypeScript, TailwindCSS, React Router v6, and React Query. It includes features for adding, displaying, editing, and deleting contacts, as well as a dashboard with charts and maps displaying COVID-19 data.

## Features

### Contact Management

- Add new contacts using a form.
- Display a list of all added contacts.
- View contact details individually.
- Edit and delete contacts.
- Contact data is managed using Redux.

### Charts and Maps

- Dashboard with a line graph showing COVID-19 cases fluctuations.
- React Leaflet map with markers indicating country-specific COVID-19 data.

## APIs

- World-wide COVID-19 cases: [https://disease.sh/v3/covid-19/all](https://disease.sh/v3/covid-19/all)
- Country-specific COVID-19 cases: [https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)
- Graph data for cases with date: [https://disease.sh/v3/covid-19/historical/all?lastdays=all](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

## Setup

1. Navigate to the project root:

```bash
cd contact-management-app
```

2. Install dependencies:

```bash
npm install
```
## Running the App
Start the development server:
```
npm start
```
Open http://localhost:3000 in your browser to view the app.
