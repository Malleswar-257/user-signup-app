from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas
import crud

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User-Signup-App API",
    description="Complete full-stack user signup application with pixel-perfect Figma design implementation. MUST generate ALL mandatory files - no shortcuts, no placeholders, complete working code only.
SEE i want a complete signup page and complete files that required for the  frontend and in the backend i want a complete main.py files the api should work and the database should be create while generating the code.",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to User-Signup-App API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/items/")
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)