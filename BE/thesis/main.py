from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import paper, user, authentication


app = FastAPI(
    title="My App",
    description="Description of my app.",
    # root_path="/api/v1",
    version="1.0",
    # docs_url='/docs',
    # # This line solved my issue, in my case it was a lambda function
    # openapi_url='/openapi.json',
    redoc_url=None
)


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Connects our model to the DB
models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(paper.router)
app.include_router(user.router)
# app.include_router(university.router)
