import csv, io
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Complaint, Asset, User
from app.utils.security import get_current_user

router = APIRouter(prefix="/reports", tags=["Reports"])

def csv_response(filename: str, headers: list[str], rows: list[list]):
    stream = io.StringIO()
    writer = csv.writer(stream)
    writer.writerow(headers)
    writer.writerows(rows)
    stream.seek(0)
    return StreamingResponse(iter([stream.getvalue()]), media_type="text/csv", headers={"Content-Disposition": f"attachment; filename={filename}"})

@router.get("/complaints.csv")
def complaints_csv(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    items = db.query(Complaint).all()
    return csv_response("complaints.csv", ["id","title","category","status","priority","address"], [[i.id,i.title,i.category,i.status,i.priority,i.address] for i in items])

@router.get("/assets.csv")
def assets_csv(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    items = db.query(Asset).all()
    return csv_response("assets.csv", ["id","name","type","status","address"], [[i.id,i.name,i.asset_type,i.status,i.address] for i in items])
