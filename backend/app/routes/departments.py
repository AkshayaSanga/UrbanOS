from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Department, User
from app.schemas import DepartmentIn, DepartmentOut
from app.utils.security import get_current_user
from app.utils.permissions import require_roles

router = APIRouter(prefix="/departments", tags=["Departments"])

@router.post("", response_model=DepartmentOut)
def create_department(payload: DepartmentIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    require_roles(user, ["super_admin", "department_head"])
    item = Department(**payload.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return item

@router.get("", response_model=list[DepartmentOut])
def list_departments(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Department).order_by(Department.name).all()

@router.get("/{department_id}", response_model=DepartmentOut)
def get_department(department_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.get(Department, department_id)
