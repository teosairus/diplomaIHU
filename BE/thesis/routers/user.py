from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, database, oauth2
from ..repository import user

router = APIRouter(
    prefix="/user",
    tags=['Users']
)

get_db = database.get_db


@router.post('/', response_model=schemas.ShowUser)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)


@router.get('/{uid}', response_model=schemas.ShowUser)
def get_user(uid: str, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return user.show(uid, db)
