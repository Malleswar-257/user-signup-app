# Import necessary libraries
from fastapi import FastAPI, HTTPException, status
import uvicorn
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import timedelta

app = FastAPI()

# Configuration
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    username: str
    password: str

@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: User):
    # Check if user exists
    existing_user = await User.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Create a new user document in MongoDB
    created_user = await User.create(username=user.username, password=hashed_password)
    
    return {"message": "User registered successfully", "user": created_user}

@app.post("/login", status_code=status.HTTP_200_OK)
async def login(user: User):
    # Find the user by username and password
    existing_user = await User.find_one({"username": user.username, "password": pwd_context.verify(user.password, existing_user.password)})
    
    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create a token for the user
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": existing_user.username}, expires_delta=access_token_expires)
    
    return {"message": "Login successful", "token": access_token}

@app.get("/protected", dependencies=[Depends(get_current_active_user)])
async def protected():
    # This route is only accessible if the user is authenticated
    return {"message": "This is a protected route"}

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_active_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        # Check if the user exists in MongoDB
        existing_user = await User.find_one({"username": username})
        if not existing_user:
            raise HTTPException(status_code=401, detail="User does not exist")
        
        return existing_user
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Could not validate token: {e}")