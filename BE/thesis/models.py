
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from .database import Base
from sqlalchemy.orm import relationship

# DB items/


# class UserPaper(Base):
#     __tablename__ = 'user_paper'

#     users_id = Column(ForeignKey('users.id'), primary_key=True)
#     papers_id = Column(ForeignKey('papers.id'), primary_key=True)
#     pp = relationship("User", back_populates="userPapers")
#     creator = relationship("Papers", back_populates="creators")
association_table = Table('association', Base.metadata,
                          Column('users_id', ForeignKey(
                              'users.id'), primary_key=True),
                          Column('papers_id', ForeignKey(
                              'papers.id'), primary_key=True)
                          )


class Papers(Base):
    __tablename__ = 'papers'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    publicationName = Column(String(255))
    description = Column(String(255))
    publicationType = Column(String(255))
    authors = Column(String(255))
    link = Column(String(255))
    doi = Column(String(255))
    volume = Column(String(255))
    pageRange = Column(String(255))
    source = Column(String(255))
    publishedDate = Column(Integer)
    creators = relationship(
        "User",
        secondary=association_table,
        back_populates="userPapers")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    uid = Column(String(50))
    firstname = Column(String(255))
    lastname = Column(String(255))
    orc_id = Column(String(255), nullable=True)
    scopus_id = Column(String(255), nullable=True)
    email = Column(String(255))
    userPapers = relationship(
        "Papers",
        secondary=association_table,
        back_populates="creators")


class ScopusDB(Base):
    __tablename__ = 'scopus'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    publicationName = Column(String(255))
    description = Column(String(255))
    publicationType = Column(String(255))
    authors = Column(String(255))
    link = Column(String(255))
    doi = Column(String(255))
    volume = Column(String(255))
    pageRange = Column(String(255))
    publishedDate = Column(Integer)


class OrcidDB(Base):
    __tablename__ = 'orcid'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    publicationName = Column(String(255))
    description = Column(String(255))
    publicationType = Column(String(255))
    authors = Column(String(255))
    link = Column(String(255))
    doi = Column(String(255))
    volume = Column(String(255))
    pageRange = Column(String(255))
    publishedDate = Column(Integer)
