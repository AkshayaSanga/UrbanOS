from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserOut, LoginIn, TokenOut
from app.utils.security import hash_password, verify_password, create_access_token, get_current_user
from app.services.audit_service import log_action

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(400, "Email already registered")
    user = User(full_name=payload.full_name, email=payload.email, hashed_password=hash_password(payload.password), role=payload.role, department_id=payload.department_id, phone=payload.phone)
    db.add(user); db.commit(); db.refresh(user)
    log_action(db, user.id, "REGISTER", "User", user.id)
    return user

@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(401, "Invalid email or password")
    token = create_access_token({"sub": str(user.id), "role": user.role})
    log_action(db, user.id, "LOGIN", "User", user.id)
    return {"access_token": token, "user": user}

@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return user
