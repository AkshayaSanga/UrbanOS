from fastapi import HTTPException, status

def require_roles(user, roles: list[str]):
    if user.role not in roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
