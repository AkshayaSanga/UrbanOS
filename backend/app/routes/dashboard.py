from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Complaint, Asset, Alert, User
from app.schemas import DashboardSummary
from app.utils.security import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary", response_model=DashboardSummary)
def summary(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    total = db.query(Complaint).count()
    resolved = db.query(Complaint).filter(Complaint.status == "Resolved").count()
    pending = db.query(Complaint).filter(Complaint.status != "Resolved").count()
    active_assets = db.query(Asset).filter(Asset.status == "Active").count()
    critical = db.query(Alert).filter(Alert.severity == "Critical", Alert.is_active == True).count()
    return {"total_complaints": total, "pending_complaints": pending, "resolved_complaints": resolved, "active_assets": active_assets, "critical_alerts": critical, "sla_compliance": round((resolved / total * 100) if total else 100, 2)}

@router.get("/complaint-trends")
def complaint_trends(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Complaint.category, func.count(Complaint.id)).group_by(Complaint.category).all()
    return [{"name": k, "value": v} for k, v in rows]

@router.get("/department-performance")
def department_performance(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Complaint.department_id, func.count(Complaint.id)).group_by(Complaint.department_id).all()
    return [{"department_id": k, "complaints": v} for k, v in rows]

@router.get("/asset-status")
def asset_status(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Asset.status, func.count(Asset.id)).group_by(Asset.status).all()
    return [{"name": k, "value": v} for k, v in rows]
