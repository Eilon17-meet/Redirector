from passlib.apps import custom_app_context as pwd_context
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean, desc, func
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from sqlalchemy.pool import NullPool

Base = declarative_base()


class Hyperlink(Base):
    __tablename__ = 'hyperlink'
    id = Column(Integer, primary_key=True)
    word = Column(String, unique=True)
    url = Column(String)
    timestamp = Column(DateTime, default=func.now())

    used = Column(Integer, default=0)

engine = create_engine('sqlite:///database.db', poolclass=NullPool)
# 'postgres://wnhfzdmxqiwjjh:8303f7e3899346cf3160f14b33f334a61505629ce61bdd1ae4c38250fb34771d@ec2-54-227-250-33.compute-1.amazonaws.com:5432/df1iuch3j1v8gi')

Base.metadata.create_all(engine)
