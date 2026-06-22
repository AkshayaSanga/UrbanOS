\# UrbanOS



\## Smart City Operations Platform



UrbanOS is a full-stack municipal operations platform designed to help city administrations manage complaints, infrastructure assets, emergency alerts, field operations, analytics, and citizen engagement from a unified command center.



The platform provides a production-style government dashboard with GIS monitoring, workflow management, role-based access control, and operational analytics.



\---



\## Features



\### Citizen Services



\* Register and login securely

\* Submit civic complaints

\* Track complaint status

\* View complaint history

\* Receive updates on issue resolution



\### Complaint Management



\* Complaint lifecycle tracking

\* Status transitions:



&#x20; \* Submitted

&#x20; \* Assigned

&#x20; \* In Progress

&#x20; \* Resolved

&#x20; \* Rejected

\* Officer assignment workflow

\* Department routing



\### Asset Management



\* Road infrastructure tracking

\* Water infrastructure monitoring

\* Traffic asset management

\* Sanitation asset records

\* Maintenance scheduling



\### Emergency Alerts



\* Critical incident management

\* City-wide alerts

\* Emergency response coordination

\* Priority escalation workflows



\### GIS Command Center



\* Interactive city map

\* OpenStreetMap integration

\* Complaint visualization

\* Asset monitoring

\* Operational overview



\### Analytics Dashboard



\* Total complaints

\* Pending complaints

\* Resolved complaints

\* Active assets

\* Critical alerts

\* SLA compliance monitoring

\* Trend analysis

\* Department performance metrics



\### Administration



\* Role-based access control

\* User management

\* Department management

\* Audit logs

\* Activity tracking



\### Reporting



\* CSV exports

\* Operational summaries

\* Department reports

\* Performance analytics



\---



\## Tech Stack



\### Frontend



\* Next.js 15

\* TypeScript

\* Tailwind CSS

\* Recharts

\* Axios

\* OpenStreetMap



\### Backend



\* FastAPI

\* Python

\* SQLAlchemy

\* PostgreSQL

\* Pydantic

\* JWT Authentication

\* Passlib



\### Database



\* PostgreSQL



\### DevOps



\* Docker

\* Docker Compose



\---



\## Architecture



```text

Frontend (Next.js)

&#x20;       │

&#x20;       ▼

REST API (FastAPI)

&#x20;       │

&#x20;       ▼

PostgreSQL Database

```



\---



\## Project Structure



```text

UrbanOS

│

├── backend

│   ├── app

│   ├── models

│   ├── routes

│   ├── services

│   └── database

│

├── frontend

│   ├── app

│   ├── components

│   ├── lib

│   └── types

│

├── docker-compose.yml

└── README.md

```



\---



\## Local Development



\### Clone Repository



```bash

git clone https://github.com/AkshayaSanga/UrbanOS.git

cd UrbanOS

```



\### Run Using Docker



```bash

docker compose up --build

```



\---



\## Application URLs



Frontend



```text

http://localhost:3000

```



Backend API



```text

http://localhost:8000

```



Swagger Documentation



```text

http://localhost:8000/docs

```



\---



\## Demo Credentials



\### Super Admin



```text

Email: admin@metrovision.dev

Password: Admin@123

```



\### Officer



```text

Email: officer@metrovision.dev

Password: Officer@123

```



\### Citizen



```text

Email: citizen@metrovision.dev

Password: Citizen@123

```



\---



\## Environment Variables



\### Backend



Create:



```text

backend/.env

```



Example:



```env

DATABASE\_URL=postgresql://postgres:postgres@db:5432/urbanos

SECRET\_KEY=your-secret-key

ACCESS\_TOKEN\_EXPIRE\_MINUTES=60

```



\### Frontend



Create:



```text

frontend/.env.local

```



Example:



```env

NEXT\_PUBLIC\_API\_URL=http://localhost:8000

```



\---



\## Screenshots



Add screenshots after deployment:



\* Login

\* Dashboard

\* Complaints

\* Assets

\* Alerts

\* GIS Map

\* Reports

\* Admin Panel



\---



\## Future Enhancements



\* Work Order Management

\* SLA Tracking

\* Push Notifications

\* Mobile Application

\* AI-based Complaint Classification

\* Predictive Infrastructure Maintenance

\* Advanced GIS Layers

\* Real-time Incident Monitoring



\---



\## Resume Description



UrbanOS is a production-style Smart City Operations Platform developed using Next.js, FastAPI, PostgreSQL, Docker, and GIS technologies. The platform supports complaint management, asset tracking, emergency alerting, analytics dashboards, role-based workflows, and municipal operations monitoring through a centralized command center.



\---



\## Author



Akshaya Sanga



GitHub:

https://github.com/AkshayaSanga



LinkedIn:

https://linkedin.com/in/akshaya-sanga-b9bb07307



