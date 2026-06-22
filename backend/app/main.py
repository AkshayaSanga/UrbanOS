from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine
from app.routes import auth, complaints, departments, assets, alerts, dashboard, reports

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MetroVision API", version="1.0.0", description="Smart City Operations Platform API")

origins = [x.strip() for x in settings.cors_origins.split(",")]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(auth.router)
app.include_router(complaints.router)
app.include_router(departments.router)
app.include_router(assets.router)
app.include_router(alerts.router)
app.include_router(dashboard.router)
app.include_router(reports.router)

@app.get("/")
def root():
    return {"name": "MetroVision API", "docs": "/docs"}
