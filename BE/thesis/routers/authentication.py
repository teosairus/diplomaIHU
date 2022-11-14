from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from .. import schemas, database, models, token
from ..hashing import Hash
from sqlalchemy.orm import Session
import requests
import json
from ..repository import user

router = APIRouter(tags=['Authentication'])


# @router.post('/login')
# def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
#     user = db.query(models.User).filter(
#         models.User.email == request.username).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Invalid Credentials")
#     if not Hash.verify(user.password, request.password):
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Incorrect password")

#     access_token = token.create_access_token(data={"sub": user.email})
#     return {"access_token": access_token, "token_type": "bearer"}
#     # return {"access_token": access_token, "token_type": "bearer", "id": user.id}


@router.post('/login', status_code=status.HTTP_200_OK)
def loginSSO(request: schemas.LoginSSO, db: Session = Depends(database.get_db)):

    localSecret = "5ptw794qxu5h4xhv63hzx2d3pz1wsufzwbfv80pgmyqk1x8e0d"
    devSecret = "4xoe8gmcuvoyncs2kgg15a86ddo38ozi6ehrqh9c747fkh0bvf"

    # Call for getting the access token from IHU for next calls in IHU APIs

    data = "client_id=" + request.client_id + "&client_secret=" + localSecret + \
        "&grant_type=authorization_code&scope=profile&code="+request.code
    response = requests.post("https://login.iee.ihu.gr/token", headers={
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }, data=data)

# If we get the access token from IHU successfully
    if response.status_code == 200:
        response_JSON = response.json()
        access_token_ihu = response_JSON['access_token']

    # API call to get the profile of the logged in user from IHU servers
        res = requests.get("https://api.iee.ihu.gr/profile", headers={
            "x-access-token": access_token_ihu,
            "Accept": "application/json"
        })

    # if we get the profile info successfully
        if res.status_code == 200:
            res_JSON = res.json()

            temp_user = {
                "uid": res_JSON['uid'],
                "firstname": res_JSON['givenName'],
                "lastname": res_JSON['sn'],
                "orc_id": res_JSON['orcid'] if "orcid" in res_JSON.keys() else None,
                "scopus_id": res_JSON['scopusID'] if "scopusID" in res_JSON.keys() else None,
                "email": res_JSON['mail'],
            }

            user_db = db.query(models.User).filter(
                models.User.email == temp_user["email"]).first()
        # If the logged in user is not in our DB then add him/her and return our access token to FE to be able to call our API
            if not user_db:
                # Add logged in user in our DB
                user.create(temp_user, db)

                # generate our token and return it
                access_token = token.create_access_token(
                    data={"sub": temp_user['email']})

                return {"access_token": access_token, "token_type": "bearer", "user_info": temp_user}
         # If the logged in user is in our DB, return our access token to FE to be able to call our API
            else:
                access_token = token.create_access_token(
                    data={"sub": temp_user['email']})
                return {"access_token": access_token, "token_type": "bearer", "user_info": temp_user}

 # if we don't get the profile info throw an error
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"User not found in IHU Servers")

# If we don't get the access token from IHU throw an errow
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f"Something went wrong in authenticating with IHU Servers")
