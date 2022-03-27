from typing import List, Optional
from pydantic import BaseModel

# what API asks

# -----------------------\ BASE /------------------------------------


class Paper(BaseModel):
    title: str
    publicationName: str
    description: str
    publicationType: str
    authors: str
    link: str
    doi: str
    volume: str
    pageRange: str
    source: str
    publishedDate: str

    class Config():
        orm_mode = True


class User(BaseModel):
    firstname: str
    lastname: str
    orc_id: str
    scopus_id: str
    email: str
    password: str
    location: Optional[str] = None

    class Config():
        orm_mode = True
    # institution: Optional[str] = None


# class University(BaseModel):
#     name: str

#     class Config():
#         orm_mode = True


# -----------------------\ SHOW /------------------------------------
class ShowUser(BaseModel):
    id: int
    firstname: str
    lastname: str
    orc_id: str
    scopus_id: str
    email: str
    location: Optional[str] = None
    userPapers: List[Paper]

    class Config():
        orm_mode = True


class ShowPaper(Paper):
    creators: List[User]


# -----------------------\ LOGIN /------------------------------------


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
