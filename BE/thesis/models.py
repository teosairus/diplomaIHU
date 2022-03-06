
from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship

# DB items/


class Papers(Base):
    __tablename__ = 'papers'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    body = Column(String(255))
    user_id = Column(Integer, ForeignKey('users.id'))

    creator = relationship("User", back_populates="papers")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))
    location = Column(String(255))

    papers = relationship('Papers', back_populates="creator")


class University(Base):
    __tablename__ = 'universities'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
