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

## Recent Changes
- 2024-11-26: Added error boundary for Spline/WebGL failures
- 2024-11-26: Configured for Replit environment (port 5000, allowedHosts)
