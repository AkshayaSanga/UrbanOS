# MetroVision – Smart City Operations Platform

## Overview

MetroVision is a full-stack Smart City Operations Platform designed to help municipalities monitor complaints, infrastructure assets, emergency alerts, GIS locations, and operational analytics from a single command center.

The project demonstrates enterprise software architecture, authentication, REST APIs, PostgreSQL integration, GIS visualization, and modern frontend development.

---

## Features

### Dashboard

* Enterprise Command Center
* KPI Cards
* Operational Analytics
* Live Activity
* Department Performance
* Officer Status

### Complaint Management

* Citizen Complaint Registration
* Search & Filters
* Priority Tracking
* Status Workflow
* Department Assignment

### Asset Management

* Infrastructure Asset Tracking
* Operational Status
* Maintenance Monitoring

### GIS Command Center

* Interactive Leaflet Map
* Complaint Locations
* Asset Locations
* Emergency Alerts
* Layer Controls

### Reports

* Operational Analytics
* Department Performance
* CSV Export
* PDF Export

### Administration

* User Management
* Department Management
* Role-Based Access Control
* Audit Logs

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Recharts
* React Leaflet

### Backend

* FastAPI
* Python
* PostgreSQL
* SQLAlchemy
* JWT Authentication

### DevOps

* Docker
* Docker Compose
* GitHub
* Vercel
* Render

---

## Architecture

Citizen Portal

↓

REST API (FastAPI)

↓

Business Services

↓

PostgreSQL Database

↓

Dashboard + GIS + Reports

---

## Project Structure

frontend/

backend/

docker-compose.yml

README.md

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Demo Credentials

Administrator

Email: [admin@metrovision.dev](mailto:admin@metrovision.dev)

Password: admin123

---

## Screenshots

* Login
* Dashboard
* Complaints
* GIS Map
* Reports
* Admin

(Add screenshots inside `/screenshots`.)

---

## Future Improvements

* Real-time WebSockets
* Push Notifications
* AI Incident Classification
* Predictive Analytics
* Mobile Application

---

## License

MIT License
