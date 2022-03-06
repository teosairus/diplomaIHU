from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, schemas
from ..repository import university

router = APIRouter(
    prefix="/university",
    tags=['University']
)

get_db = database.get_db


@router.post('/', response_model=schemas.University)
def create_user(request: schemas.University, db: Session = Depends(get_db)):
    return university.create(request, db)


@router.get('/{id}', response_model=schemas.University)
def get_user(id: int, db: Session = Depends(get_db)):
    return university.show(id, db)
