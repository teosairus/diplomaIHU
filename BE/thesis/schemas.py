from typing import List, Optional
from pydantic import BaseModel

# what API asks


class PaperBase(BaseModel):
    title: str
    body: str


class Paper(PaperBase):
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
    institution: Optional[str] = None


class University(BaseModel):
    name: str

    class Config():
        orm_mode = True


class ShowUser(BaseModel):
    firstname: str
    lastname: str
    orc_id: str
    scopus_id: str
    email: str
    location: Optional[str] = None
    papers: List[Paper] = []
    university: University = None

    class Config():
        orm_mode = True


class ShowPaper(BaseModel):
    title: str
    body: str
    creator: ShowUser

    class Config():
        orm_mode = True


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
