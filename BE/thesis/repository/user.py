from sqlalchemy import null
from sqlalchemy.orm import Session
from .. import models, schemas, helpers
from fastapi import HTTPException, status
from ..hashing import Hash
from ..externalCalls import externalAPIS


def create(request: schemas.User, db: Session):
    # Checks if the used email is a valid email address
    if (helpers.checkEmail(request.email)):
        exists = db.query(models.User).filter(
            models.User.email == request.email).first()

        # If the user is not in DB then we can create the user and populate the SCOPUS DB and the ORCID DB
        if not exists:
            new_user = models.User(
                firstname=request.firstname, lastname=request.lastname, orc_id=request.orc_id, scopus_id=request.scopus_id, email=request.email, password=Hash.bcrypt(request.password), location=None if not request.location else request.location)
            # SCOPUS DB population
            if (request.scopus_id):
                temp = externalAPIS.get_user_data_SCOPUS(request.scopus_id)
                if temp:
                    for index in range(len(temp)):
                        new_scopus = models.ScopusDB(
                            title=temp[index]['title'],
                            publicationName=temp[index]['publicationName'],
                            description=temp[index]['description'],
                            publicationType=temp[index]['publicationType'],
                            authors=temp[index]['authors'],
                            link=temp[index]['link'],
                            doi=temp[index]['doi'],
                            volume=temp[index]['volume'],
                            pageRange=temp[index]['pageRange'],
                            publishedDate=temp[index]['publishedDate'],
                        )
                        db.add(new_scopus)
                        db.commit()
                        db.refresh(new_scopus)
            # ORCID DB population
            if (request.orc_id):
                temp = externalAPIS.get_user_data_ORCID(request.orc_id)

                if temp:
                    for index in range(len(temp)):
                        new_orcid = models.OrcidDB(
                            title=temp[index]['title'],
                            publicationName=temp[index]['publicationName'],
                            description=temp[index]['description'],
                            publicationType=temp[index]['publicationType'],
                            authors=temp[index]['authors'],
                            link=temp[index]['link'],
                            doi=temp[index]['doi'],
                            volume=temp[index]['volume'],
                            pageRange=temp[index]['pageRange'],
                            publishedDate=temp[index]['publishedDate'],
                        )
                        db.add(new_orcid)
                        db.commit()
                        db.refresh(new_orcid)

            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        else:
            raise HTTPException(
                status_code=status.HTTP_302_FOUND, detail="This user already exists.")
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Please use a valid email address.")


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
