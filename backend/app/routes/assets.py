from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Asset, User
from app.schemas import AssetIn, AssetOut
from app.utils.security import get_current_user
from app.utils.permissions import require_roles
from app.services.audit_service import log_action

router = APIRouter(prefix="/assets", tags=["Assets"])

@router.post("", response_model=AssetOut)
def create_asset(payload: AssetIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head"])
    item = Asset(**payload.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    log_action(db, user.id, "ASSET_CREATED", "Asset", item.id)
    return item

@router.get("", response_model=list[AssetOut])
def list_assets(status: str | None = None, asset_type: str | None = None, department_id: int | None = None, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    q = db.query(Asset)
    if status: q = q.filter(Asset.status == status)
    if asset_type: q = q.filter(Asset.asset_type == asset_type)
    if department_id: q = q.filter(Asset.department_id == department_id)
    return q.order_by(Asset.id.desc()).all()

@router.get("/{asset_id}", response_model=AssetOut)
def get_asset(asset_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.get(Asset, asset_id)
    if not item: raise HTTPException(404, "Asset not found")
    return item

@router.patch("/{asset_id}", response_model=AssetOut)
def update_asset(asset_id: int, payload: AssetIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head", "officer"])
    item = db.get(Asset, asset_id)
    if not item: raise HTTPException(404, "Asset not found")
    for key, value in payload.model_dump().items(): setattr(item, key, value)
    db.commit(); db.refresh(item)
    log_action(db, user.id, "ASSET_UPDATED", "Asset", item.id)
    return item

@router.delete("/{asset_id}")
def delete_asset(asset_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin"])
    item = db.get(Asset, asset_id)
    if not item: raise HTTPException(404, "Asset not found")
    db.delete(item); db.commit()
    log_action(db, user.id, "ASSET_DELETED", "Asset", asset_id)
    return {"ok": True}
