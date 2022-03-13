from typing import List, Optional
from pydantic import BaseModel

# what API asks

# -----------------------\ BASE /------------------------------------


class Paper(BaseModel):
    source: str
    paper_title: str
    paper_type: str
    doi: str
    authors: str
    published_date: str
    user_id: int

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


# -----------------------\ SHOW /------------------------------------
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
    source: str
    paper_title: str
    paper_type: str
    doi: str
    authors: str
    published_date: str
    creator: List[ShowUser] = []

    class Config():
        orm_mode = True

# -----------------------\ LOGIN /------------------------------------


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
