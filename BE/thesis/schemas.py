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
    name: str
    email: str
    password: str
    location: str


class University(BaseModel):
    name: str

    class Config():
        orm_mode = True


class ShowUser(BaseModel):
    name: str
    email: str
    location: str
    papers: List[Paper] = []

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
