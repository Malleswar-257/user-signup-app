# user-signup-app

Complete full-stack user signup application with pixel-perfect Figma design implementation. MUST generate ALL mandatory files - no shortcuts, no placeholders, complete working code only.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI + PostgreSQL
- **Design**: Figma ([View Design](https://www.figma.com/design/29HkCjsfiXv6gTPjrXmYwy/Sign-Up-Form--V1---Community-))

## Project Structure

```
user-signup-app/
├── frontend/          # Frontend application
├── backend/           # Backend API
├── README.md          # This file
└── docker-compose.yml # Docker configuration (if applicable)
```

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for Python backends)
- Docker (optional, for containerized setup)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
# Follow backend-specific setup instructions in backend/README.md
```

## Features

- User signup
- User login
- Email verification
- Password reset

## API Endpoints

- `POST /api/signup` - Create a new user account
- `POST /api/login` - Log in to an existing user account
- `GET /api/user` - Get the current user's information
- `POST /api/send-verification-email` - Send a verification email to the user's email address
- `POST /api/verify-email` - Verify the user's email address

## License

MIT
