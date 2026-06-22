from app.database import Base, engine, SessionLocal
from app.models import User, Department, Complaint, Asset, Alert
from app.utils.security import hash_password

Base.metadata.create_all(bind=engine)
db = SessionLocal()
try:
    if db.query(User).filter(User.email == "admin@metrovision.dev").first():
        print("Seed already exists")
        raise SystemExit

    deps = [
        Department(name="Roads", description="Road infrastructure and pothole response"),
        Department(name="Water", description="Water leakage and supply operations"),
        Department(name="Sanitation", description="Waste and drainage services"),
        Department(name="Traffic", description="Signals, congestion, and road closures"),
        Department(name="Emergency", description="Emergency response coordination"),
    ]
    db.add_all(deps); db.commit()
    dep_map = {d.name: d.id for d in db.query(Department).all()}

    users = [
        User(full_name="MetroVision Admin", email="admin@metrovision.dev", hashed_password=hash_password("Admin@123"), role="super_admin"),
        User(full_name="Roads Officer", email="officer@metrovision.dev", hashed_password=hash_password("Officer@123"), role="officer", department_id=dep_map["Roads"]),
        User(full_name="Water Officer", email="water.officer@metrovision.dev", hashed_password=hash_password("Officer@123"), role="officer", department_id=dep_map["Water"]),
        User(full_name="Citizen Demo", email="citizen@metrovision.dev", hashed_password=hash_password("Citizen@123"), role="citizen"),
        User(full_name="Akshaya Citizen", email="akshaya@metrovision.dev", hashed_password=hash_password("Citizen@123"), role="citizen"),
    ]
    db.add_all(users); db.commit()
    admin = db.query(User).filter_by(email="admin@metrovision.dev").first()
    officer = db.query(User).filter_by(email="officer@metrovision.dev").first()
    citizen = db.query(User).filter_by(email="citizen@metrovision.dev").first()

    areas = [
        ("LB Nagar",17.3457,78.5522),("Uppal",17.4050,78.5591),("Hitech City",17.4435,78.3772),("Madhapur",17.4486,78.3908),
        ("Secunderabad",17.4399,78.4983),("Kukatpally",17.4933,78.3915),("Ameerpet",17.4375,78.4483),("Gachibowli",17.4401,78.3489)
    ]
    categories = ["Pothole","Garbage","Water leakage","Streetlight issue","Traffic signal issue","Drainage"]
    statuses = ["Submitted","Assigned","In Progress","Resolved"]
    priorities = ["Low","Medium","High","Critical"]
    complaints=[]
    for i in range(25):
        area, lat, lon = areas[i % len(areas)]
        cat = categories[i % len(categories)]
        dept = dep_map["Roads"] if cat in ["Pothole","Streetlight issue"] else dep_map["Water"] if cat == "Water leakage" else dep_map["Sanitation"] if cat in ["Garbage","Drainage"] else dep_map["Traffic"]
        complaints.append(Complaint(title=f"{cat} reported near {area}", description=f"Citizen reported {cat.lower()} issue requiring municipal action.", category=cat, status=statuses[i % 4], priority=priorities[i % 4], latitude=lat+0.002*i, longitude=lon+0.001*i, address=f"{area}, Hyderabad", citizen_id=citizen.id, assigned_officer_id=officer.id if i % 3 else None, department_id=dept))
    db.add_all(complaints)

    asset_types = ["Street Light","CCTV Camera","Water Pump","Traffic Signal","Public Building"]
    asset_statuses = ["Active","Under Maintenance","Faulty","Retired"]
    assets=[]
    for i in range(15):
        area, lat, lon = areas[i % len(areas)]
        assets.append(Asset(name=f"{asset_types[i%5]}-{1000+i}", asset_type=asset_types[i%5], status=asset_statuses[i%4], latitude=lat, longitude=lon, address=f"{area}, Hyderabad", department_id=list(dep_map.values())[i % len(dep_map)], last_maintenance_date="2026-05-10", next_maintenance_date="2026-07-10"))
    db.add_all(assets)

    alerts = [
        Alert(title="Road closure at Madhapur", message="Road closed due to emergency repairs.", severity="High", latitude=17.4486, longitude=78.3908, location_name="Madhapur", is_active=True, created_by=admin.id),
        Alert(title="Water supply interruption", message="Scheduled water supply interruption in LB Nagar.", severity="Medium", latitude=17.3457, longitude=78.5522, location_name="LB Nagar", is_active=True, created_by=admin.id),
        Alert(title="Accident near Hitech City", message="Traffic diversion active.", severity="Critical", latitude=17.4435, longitude=78.3772, location_name="Hitech City", is_active=True, created_by=admin.id),
        Alert(title="Drainage overflow", message="Sanitation team dispatched.", severity="High", latitude=17.4933, longitude=78.3915, location_name="Kukatpally", is_active=True, created_by=admin.id),
        Alert(title="Fire safety advisory", message="Public advisory for emergency lane clearance.", severity="Low", latitude=17.4399, longitude=78.4983, location_name="Secunderabad", is_active=False, created_by=admin.id),
    ]
    db.add_all(alerts); db.commit()
    print("Seed completed")
finally:
    db.close()
