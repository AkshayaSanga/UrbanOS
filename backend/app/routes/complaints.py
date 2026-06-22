from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Complaint, ComplaintUpdate, Notification, User
from app.schemas import ComplaintIn, ComplaintOut, AssignIn, StatusIn
from app.utils.security import get_current_user
from app.utils.permissions import require_roles
from app.services.audit_service import log_action

router = APIRouter(prefix="/complaints", tags=["Complaints"])

@router.post("", response_model=ComplaintOut)
def create_complaint(payload: ComplaintIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    complaint = Complaint(**payload.model_dump(), citizen_id=user.id)
    db.add(complaint); db.commit(); db.refresh(complaint)
    log_action(db, user.id, "COMPLAINT_CREATED", "Complaint", complaint.id)
    return complaint

@router.get("", response_model=list[ComplaintOut])
def list_complaints(status: str | None = None, category: str | None = None, priority: str | None = None, department_id: int | None = None, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    q = db.query(Complaint)
    if user.role == "citizen": q = q.filter(Complaint.citizen_id == user.id)
    if user.role == "officer": q = q.filter(Complaint.assigned_officer_id == user.id)
    if status: q = q.filter(Complaint.status == status)
    if category: q = q.filter(Complaint.category == category)
    if priority: q = q.filter(Complaint.priority == priority)
    if department_id: q = q.filter(Complaint.department_id == department_id)
    return q.order_by(Complaint.id.desc()).all()

@router.get("/my", response_model=list[ComplaintOut])
def my_complaints(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Complaint).filter(Complaint.citizen_id == user.id).order_by(Complaint.id.desc()).all()

@router.get("/{complaint_id}", response_model=ComplaintOut)
def get_complaint(complaint_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.get(Complaint, complaint_id)
    if not item: raise HTTPException(404, "Complaint not found")
    return item

@router.patch("/{complaint_id}/assign", response_model=ComplaintOut)
def assign_complaint(complaint_id: int, payload: AssignIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head"])
    item = db.get(Complaint, complaint_id)
    if not item: raise HTTPException(404, "Complaint not found")
    item.assigned_officer_id = payload.officer_id
    item.department_id = payload.department_id or item.department_id
    old = item.status
    item.status = "Assigned"
    db.add(ComplaintUpdate(complaint_id=item.id, user_id=user.id, old_status=old, new_status="Assigned", remarks=payload.remarks))
    db.add(Notification(user_id=payload.officer_id, title="New complaint assigned", message=f"Complaint #{item.id} assigned to you"))
    db.commit(); db.refresh(item)
    log_action(db, user.id, "COMPLAINT_ASSIGNED", "Complaint", item.id, {"officer_id": payload.officer_id})
    return item

@router.patch("/{complaint_id}/status", response_model=ComplaintOut)
def update_status(complaint_id: int, payload: StatusIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.get(Complaint, complaint_id)
    if not item: raise HTTPException(404, "Complaint not found")
    old = item.status
    item.status = payload.status
    if payload.status == "Resolved": item.resolved_at = datetime.now(timezone.utc)
    db.add(ComplaintUpdate(complaint_id=item.id, user_id=user.id, old_status=old, new_status=payload.status, remarks=payload.remarks))
    db.add(Notification(user_id=item.citizen_id, title="Complaint status changed", message=f"Complaint #{item.id} is now {payload.status}"))
    db.commit(); db.refresh(item)
    log_action(db, user.id, "COMPLAINT_STATUS_UPDATED", "Complaint", item.id, {"old": old, "new": payload.status})
    return item
