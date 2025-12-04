# User-Signup-App Backend

Complete full-stack user signup application with pixel-perfect Figma design implementation. MUST generate ALL mandatory files - no shortcuts, no placeholders, complete working code only.
SEE i want a complete signup page and complete files that required for the  frontend and in the backend i want a complete main.py files the api should work and the database should be create while generating the code.

## Setup

1. Install PostgreSQL:
   - Download from https://www.postgresql.org/download/
   - Or use Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password --name postgres postgres:latest`

2. Create database:
   ```sql
   CREATE DATABASE app_db;
   ```

3. Update DATABASE_URL in .env file with your credentials

4. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Run the server:
   ```bash
   python main.py
   ```

7. Visit http://localhost:8000/docs for API documentation

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /items/` - List items
- `POST /items/` - Create item

## Built With

- FastAPI
- PostgreSQL
- SQLAlchemy
- Uvicorn
