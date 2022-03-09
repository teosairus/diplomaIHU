from sqlalchemy import null
from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from ..hashing import Hash


def create(request: schemas.User, db: Session):
    uni = db.query(models.University).filter(
        models.University.name == request.institution).first()

    if not uni:
        uni = None
    else:
        uni = uni.id

    new_user = models.User(
        firstname=request.firstname, lastname=request.lastname, orc_id=request.orc_id, scopus_id=request.scopus_id, email=request.email, password=Hash.bcrypt(request.password), location=None if not request.location else request.location, university_id=uni)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
