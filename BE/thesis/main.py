from fastapi import FastAPI
from . import models
from .database import engine
from .routers import paper, user, university, authentication


app = FastAPI()


# Connects our model to the DB
models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(paper.router)
app.include_router(user.router)
app.include_router(university.router)
