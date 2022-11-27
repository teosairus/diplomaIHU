from sqlalchemy import null
from sqlalchemy.orm import Session
import copy
from .. import models, schemas, helpers
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from ..hashing import Hash
from ..externalCalls import externalAPIS, mergeDBs


def create(request: schemas.User, db: Session):
    # Checks if the used email is a valid email address
    if (helpers.checkEmail(request['email'])):
        exists = db.query(models.User).filter(
            models.User.email == request['email']).first()

        # If the user is not in DB then we can create the user and populate the SCOPUS DB and the ORCID DB
        if not exists:
            new_user = models.User(firstname=request['firstname'], lastname=request['lastname'],
                                   orc_id=request['orc_id'], scopus_id=request['scopus_id'], email=request['email'], uid=request['uid'])
            scopusList = []
            orcidList = []

            # SCOPUS DB population
            if (request['scopus_id']):
                tempScopus = externalAPIS.get_user_data_SCOPUS(
                    request['scopus_id'])

                if tempScopus:
                    # tempScopus = mergeDBs.removeDuplicatesDB(tempScopus)
                    scopusList = copy.deepcopy(tempScopus)
                    for index in range(len(tempScopus)):
                        new_scopus = models.ScopusDB(
                            title=tempScopus[index]['title'],
                            publicationName=tempScopus[index]['publicationName'],
                            description=tempScopus[index]['description'],
                            publicationType=tempScopus[index]['publicationType'],
                            authors=tempScopus[index]['authors'],
                            link=tempScopus[index]['link'],
                            doi=tempScopus[index]['doi'],
                            volume=tempScopus[index]['volume'],
                            pageRange=tempScopus[index]['pageRange'],
                            publishedDate=tempScopus[index]['publishedDate'],

                        )
                        db.add(new_scopus)
                        db.commit()
                        db.refresh(new_scopus)
            # ORCID DB population
            if (request['orc_id']):
                tempOrcid = externalAPIS.get_user_data_ORCID(request['orc_id'])

                if tempOrcid:
                    # tempOrcid = mergeDBs.removeDuplicatesDB(tempOrcid)
                    orcidList = copy.deepcopy(tempOrcid)
                    for index in range(len(tempOrcid)):
                        new_orcid = models.OrcidDB(
                            title=tempOrcid[index]['title'],
                            publicationName=tempOrcid[index]['publicationName'],
                            description=tempOrcid[index]['description'],
                            publicationType=tempOrcid[index]['publicationType'],
                            authors=tempOrcid[index]['authors'],
                            link=tempOrcid[index]['link'],
                            doi=tempOrcid[index]['doi'],
                            volume=tempOrcid[index]['volume'],
                            pageRange=tempOrcid[index]['pageRange'],
                            publishedDate=tempOrcid[index]['publishedDate'],
                        )
                        db.add(new_orcid)
                        db.commit()
                        db.refresh(new_orcid)

            papersList = jsonable_encoder(db.query(models.Papers).all())

            papersToAdd = mergeDBs.itemsToAdd(
                papersList, scopusList, orcidList)

            if papersToAdd:
                tempPapers = []
                for index in range(len(papersToAdd)):
                    new_paper = models.Papers(
                        title=papersToAdd[index]['title'],
                        publicationName=papersToAdd[index]['publicationName'],
                        description=papersToAdd[index]['description'],
                        publicationType=papersToAdd[index]['publicationType'],
                        authors=papersToAdd[index]['authors'],
                        link=papersToAdd[index]['link'],
                        doi=papersToAdd[index]['doi'],
                        volume=papersToAdd[index]['volume'],
                        pageRange=papersToAdd[index]['pageRange'],
                        publishedDate=papersToAdd[index]['publishedDate'],
                        source=papersToAdd[index]['source'],
                        hidden=False,
                    )

                    tempPapers.append(new_paper)
                    db.add(new_paper)
                    db.commit()
                    db.refresh(new_paper)

                new_user.__setattr__('userPapers', tempPapers)
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


def show(uid: str, db: Session):
    user = db.query(models.User).filter(models.User.uid == uid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the uid {uid} is not available")
    return user
