# Redweyne Sci-Fi Portfolio

## Overview
A modern, sci-fi themed portfolio website built with React and FastAPI. Features a cyberpunk aesthetic with 3D Spline graphics, smooth animations, and a contact form system.

## Project Structure
```
/
├── frontend/           # React frontend (port 5000)
│   ├── src/
│   │   ├── components/ # UI components
│   │   │   ├── ui/     # Shadcn/Radix UI components
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── ...
│   │   ├── data/mock.js # Portfolio content data
│   │   └── lib/utils.js
│   ├── craco.config.js
│   └── package.json
│
├── backend/            # FastAPI backend (port 8000)
│   ├── server.py       # API endpoints
│   └── requirements.txt
│
└── tests/
```

## Technologies
- **Frontend**: React 19, TailwindCSS, Radix UI, Spline 3D, Lucide Icons
- **Backend**: FastAPI, Motor (async MongoDB), Pydantic
- **Build Tool**: CRACO (Create React App Configuration Override)

## Environment Variables

### Frontend (.env)
- `REACT_APP_BACKEND_URL` - Backend API URL
- `WDS_SOCKET_PORT` - WebSocket port for dev server
- `REACT_APP_ENABLE_VISUAL_EDITS` - Enable visual editing (false)
- `ENABLE_HEALTH_CHECK` - Enable health check endpoint (false)

### Backend (Required for contact form)
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `CORS_ORIGINS` - Allowed origins (default: *)

## Running Locally

### Frontend
```bash
cd frontend && PORT=5000 npm start
```

### Backend (when MongoDB is configured)
```bash
cd backend && uvicorn server:app --host localhost --port 8000
```

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/status` - Health check

## Deployment Notes
- Frontend binds to 0.0.0.0:5000
- Backend binds to localhost:8000
- 3D Spline graphics require WebGL support
- Contact form requires MongoDB database

## VPS Deployment Guide

### Prerequisites
- Node.js 20+
- Python 3.11+
- MongoDB (local or Atlas)
- Nginx (recommended for production)

### Step 1: Set Up MongoDB
Install MongoDB on your VPS or use MongoDB Atlas:
```bash
# Local MongoDB
sudo apt install mongodb
sudo systemctl start mongodb

# Or use MongoDB Atlas connection string
```

### Step 2: Environment Variables
Create environment files:

**Backend** (`backend/.env`):
```
MONGO_URL=mongodb://localhost:27017  # or your Atlas URL
DB_NAME=portfolio_db
CORS_ORIGINS=https://yourdomain.com
```

**Frontend** (`frontend/.env`):
```
REACT_APP_BACKEND_URL=https://yourdomain.com
```

### Step 3: Build Frontend
```bash
cd frontend
npm install
npm run build
```

### Step 4: Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8000
```

For production, use with systemd or PM2:
```bash
# Using PM2
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8000" --name portfolio-api
```

### Step 5: Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend (static files)
    location / {
        root /path/to/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Health Check
Test your deployment:
```bash
curl https://yourdomain.com/api/
# Should return: {"message": "Hello World"}
```

## Recent Changes
- 2024-11-26: Added error boundary for Spline/WebGL failures
- 2024-11-26: Configured for Replit environment (port 5000, allowedHosts)
- 2024-11-26: Added VPS deployment documentation
