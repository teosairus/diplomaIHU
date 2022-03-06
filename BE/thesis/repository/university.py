from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from ..hashing import Hash


def create(request: schemas.University, db: Session):
    new_uni = models.University(
        name=request.name)
    db.add(new_uni)
    db.commit()
    db.refresh(new_uni)
    return new_uni


def show(id: int, db: Session):
    uni = db.query(models.University).filter(
        models.University.id == id).first()
    if not uni:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"University with the id {id} is not available")
    return uni
