# Digital Friction Analyzer

## Project Description

The **Digital Friction Analyzer** is a web-based system designed to detect hidden usability inefficiencies (digital friction) by analyzing how users interact with software. It silently records user behaviors—such as clicks, time spent, navigation patterns, and retries—and analyzes this data to identify friction points.

## Key Features

- **Session-Based Friction Scoring**: Calculates a friction score (0-100) for each session.
- **Screen Abandonment Detection**: Identifies where users drop off.
- **Silent Interaction Logging**: tracks clicks, navigation, and time without affecting user experience.
- **Threshold-Based Issue Severity**: Classifies issues as Low, Medium, or High.
- **Time-to-Action Benchmarking**: Compares actual user time against expected baselines.
- **Visual Dashboard**: Admin interface with charts and detailed issue lists.
- **Exportable Reports**: Download analysis results as JSON or CSV.

## Project Structure

- **frontend/**: React application (Vite) containing:
  - **User UI**: Login, Multi-Step Form, Confirmation (for generating data).
  - **Admin Dashboard**: Visualization of friction data.
- **backend/**: Node.js/Express server and SQLite database.
  - **API**: Endpoints for logging interactions and retrieving analysis.
  - **Analysis Engine**: Logic to compute scores and detect issues.

## System Flow

1. **User Interaction**: Users interact with the frontend app.
2. **Logging**: Interactions are silently sent to the backend.
3. **Storage**: Raw data is stored in the SQLite database.
4. **Analysis**: The backend processes logs to calculate friction scores.
5. **Visualization**: The dashboard requests analyzed data to display insights.

## Tech Stack

- **Frontend**: React, Chart.js/Recharts, Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: SQLite

## Setup Instructions

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
