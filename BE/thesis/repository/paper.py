from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas


def get_all(db: Session):
    papers = db.query(models.Papers).all()
    return papers


def create(request: schemas.Paper, db: Session, current_user):

    new_article = models.Papers(
        title=request.title,
        publicationName=request.publicationName,
        description=request.description,
        publicationType=request.publicationType,
        authors=request.authors,
        link=request.link,
        doi=request.doi,
        volume=request.volume,
        pageRange=request.pageRange,
        source=request.source,
        publishedDate=request.publishedDate,
        creators=[current_user]

    )

    db.add(new_article)
    db.add
    db.commit()
    db.refresh(new_article)

    return new_article


def destroy(id: int, db: Session):
    paper = db.query(models.Papers).filter(models.Papers.id == id)

    if not paper.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Paper with id {id} not found")

    paper.delete(synchronize_session=False)
    db.commit()
    return 'done'


def update(id: int, request: schemas.Paper, db: Session):
    paper = db.query(models.Papers).filter(models.Papers.id == id)

    if not paper.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Paper with id {id} not found")

    paper.update(request)
    db.commit()
    return 'updated'


def show(id: int, db: Session):
    paper = db.query(models.Papers).filter(models.Papers.id == id).first()
    if not paper:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Paper with the id {id} is not available")
    return paper
