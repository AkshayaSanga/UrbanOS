# MetroVision — Smart City Operations Platform

MetroVision is a production-style municipal smart city operations platform for city administrators, citizens, field officers, and department heads. It supports citizen complaint reporting, GIS-based monitoring, officer task workflows, emergency alerts, asset management, analytics, audit logs, and report exports.

## Features

- JWT authentication with role-based access control
- Citizen complaint lifecycle: submitted, assigned, in progress, resolved, rejected
- Officer assignment and complaint status updates
- Department management
- City asset tracking and maintenance scheduling
- Emergency alert management
- GIS command center using OpenStreetMap/Leaflet
- Dashboard KPIs and analytics charts
- Audit logs and in-app notifications
- CSV exports for complaints and assets
- Realistic Hyderabad seed data

## Tech Stack

Frontend: Next.js 15, TypeScript, Tailwind CSS, Recharts, Leaflet, Axios

Backend: FastAPI, PostgreSQL, SQLAlchemy, Pydantic, JWT, Passlib

DevOps: Docker, Docker Compose

## Run Locally

```bash
docker compose up --build
```

Frontend: http://localhost:3000

Backend Swagger Docs: http://localhost:8000/docs

## Demo Credentials

- Admin: admin@metrovision.dev / Admin@123
- Officer: officer@metrovision.dev / Officer@123
- Citizen: citizen@metrovision.dev / Citizen@123

## Environment

Backend variables are in `backend/.env.example`.

Frontend variables are in `frontend/.env.example`.

## Screenshots

Add screenshots here after running the application:

- Landing page
- Dashboard
- Complaints table
- GIS map
- Assets
- Alerts
- Admin audit logs

## Notes

This project is designed to look like a real municipal operations dashboard rather than a toy AI demo. The UI uses enterprise spacing, dark government-grade colors, practical workflows, tables, filters, and meaningful KPIs.
