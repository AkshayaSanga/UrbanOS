from pydantic import BaseModel, EmailStr, Field
from typing import Any

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(min_length=6)
    role: str = "citizen"
    department_id: int | None = None
    phone: str | None = None

class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    department_id: int | None = None
    model_config = {"from_attributes": True}

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class DepartmentIn(BaseModel):
    name: str
    description: str | None = None

class DepartmentOut(DepartmentIn):
    id: int
    model_config = {"from_attributes": True}

class ComplaintIn(BaseModel):
    title: str
    description: str
    category: str
    priority: str = "Medium"
    latitude: float = 17.3850
    longitude: float = 78.4867
    address: str = "Hyderabad"
    image_url: str | None = None
    department_id: int | None = None

class ComplaintOut(ComplaintIn):
    id: int
    status: str
    citizen_id: int
    assigned_officer_id: int | None = None
    model_config = {"from_attributes": True}

class AssignIn(BaseModel):
    officer_id: int
    department_id: int | None = None
    remarks: str | None = None

class StatusIn(BaseModel):
    status: str
    remarks: str | None = None

class AssetIn(BaseModel):
    name: str
    asset_type: str
    status: str = "Active"
    latitude: float
    longitude: float
    address: str
    department_id: int
    last_maintenance_date: str | None = None
    next_maintenance_date: str | None = None

class AssetOut(AssetIn):
    id: int
    model_config = {"from_attributes": True}

class AlertIn(BaseModel):
    title: str
    message: str
    severity: str = "Medium"
    latitude: float
    longitude: float
    location_name: str
    is_active: bool = True

class AlertOut(AlertIn):
    id: int
    created_by: int
    model_config = {"from_attributes": True}

class DashboardSummary(BaseModel):
    total_complaints: int
    pending_complaints: int
    resolved_complaints: int
    active_assets: int
    critical_alerts: int
    sla_compliance: float
