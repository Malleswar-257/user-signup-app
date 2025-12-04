from fastapi import FastAPI, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from models import User, get_db

app = FastAPI()

@app.get('/users/')
def read_users(db: sessionmaker = Depends(get_db)):
    return db.query(User).all()

@app.post('/users/')
def create_user(user: User, db: sessionmaker = Depends(get_db)):
    db.add(user)
    db.commit()
    return user