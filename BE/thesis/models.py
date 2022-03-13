
from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship

# DB items/


class Papers(Base):
    __tablename__ = 'papers'

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String(255))
    paper_title = Column(String(255))
    paper_type = Column(String(255))
    doi = Column(String(255))
    authors = Column(String(255))
    published_date = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))

    creator = relationship("User", back_populates="papers")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(255))
    lastname = Column(String(255))
    orc_id = Column(String(255))
    scopus_id = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))
    location = Column(String(255), nullable=True)
    university_id = Column(Integer, ForeignKey(
        'universities.id'), nullable=True)

    papers = relationship('Papers', back_populates="creator")
    university = relationship(
        'University', back_populates="people", uselist=False)


class University(Base):
    __tablename__ = 'universities'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))

    people = relationship("User", back_populates="university")


class ScopusDB(Base):
    __tablename__ = 'scopus'

    id = Column(Integer, primary_key=True, index=True)
    paper_title = Column(String(255))
    paper_type = Column(String(255))
    doi = Column(String(255))
    authors = Column(String(255))
    published_date = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))


class OrcidDB(Base):
    __tablename__ = 'orcid'

    id = Column(Integer, primary_key=True, index=True)
    paper_title = Column(String(255))
    paper_type = Column(String(255))
    doi = Column(String(255))
    authors = Column(String(255))
    published_date = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))
