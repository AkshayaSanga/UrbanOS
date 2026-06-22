from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Alert, User
from app.schemas import AlertIn, AlertOut
from app.utils.security import get_current_user
from app.utils.permissions import require_roles
from app.services.audit_service import log_action

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.post("", response_model=AlertOut)
def create_alert(payload: AlertIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head"])
    item = Alert(**payload.model_dump(), created_by=user.id)
    db.add(item); db.commit(); db.refresh(item)
    log_action(db, user.id, "ALERT_CREATED", "Alert", item.id)
    return item

@router.get("", response_model=list[AlertOut])
def list_alerts(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Alert).order_by(Alert.id.desc()).all()

@router.patch("/{alert_id}", response_model=AlertOut)
def update_alert(alert_id: int, payload: AlertIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head"])
    item = db.get(Alert, alert_id)
    if not item: raise HTTPException(404, "Alert not found")
    for key, value in payload.model_dump().items(): setattr(item, key, value)
    db.commit(); db.refresh(item)
    log_action(db, user.id, "ALERT_UPDATED", "Alert", item.id)
    return item

@router.delete("/{alert_id}")
def delete_alert(alert_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin"])
    item = db.get(Alert, alert_id)
    if not item: raise HTTPException(404, "Alert not found")
    db.delete(item); db.commit()
    log_action(db, user.id, "ALERT_DELETED", "Alert", alert_id)
    return {"ok": True}
