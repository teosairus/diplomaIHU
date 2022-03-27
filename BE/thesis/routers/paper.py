from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, database, oauth2
from ..repository import paper

router = APIRouter(
    prefix="/paper",
    tags=['Papers']
)

get_db = database.get_db


@router.get('/', response_model=List[schemas.ShowPaper])
def all(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return paper.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
def create(request: schemas.Paper, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return paper.create(request, db, current_user)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return paper.destroy(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int, request: schemas.Paper, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return paper.update(id, request, db)


@router.get('/{id}', status_code=200, response_model=schemas.ShowPaper)
def show(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return paper.show(id, db)
