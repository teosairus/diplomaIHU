from typing import List, Optional
from pydantic import BaseModel

# what API asks

# -----------------------\ BASE /------------------------------------


class Paper(BaseModel):
    id: int
    title: str
    publicationName: Optional[str]
    description: Optional[str]
    publicationType: Optional[str]
    authors: Optional[str]
    link: Optional[str]
    doi: Optional[str]
    volume: Optional[str]
    pageRange: Optional[str]
    source: Optional[str]
    publishedDate: Optional[str]
    hidden: bool

    class Config():
        orm_mode = True


class User(BaseModel):
    id: int
    uid: str
    firstname: str
    lastname: str
    orc_id: str
    scopus_id: str
    email: str
    # password: str
    # location: Optional[str] = None

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
    uid: str
    firstname: str
    lastname: str
    orc_id: Optional[str] = None
    scopus_id: Optional[str] = None
    email: str
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


class LoginSSO(BaseModel):
    client_id: str
    code: str
