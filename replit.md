# Redweyne Sci-Fi Portfolio

## Overview
A modern, sci-fi themed portfolio website built with React and FastAPI. Features a cyberpunk aesthetic with 3D Spline graphics, smooth animations, and a contact form that sends messages directly to your email.

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
│   ├── server.py       # API endpoints (email sending)
│   └── requirements.txt
│
└── tests/
```

## Technologies
- **Frontend**: React 19, TailwindCSS, Radix UI, Spline 3D, Lucide Icons
- **Backend**: FastAPI, Gmail SMTP
- **Build Tool**: CRACO (Create React App Configuration Override)

## Environment Variables

### Frontend (.env)
- `REACT_APP_BACKEND_URL` - Backend API URL

### Backend (.env)
- `SMTP_EMAIL` - Your Gmail address for sending emails
- `SMTP_PASSWORD` - Gmail App Password (NOT your regular password)
- `RECIPIENT_EMAIL` - Where to receive contact messages (default: redweynemk@gmail.com)
- `CORS_ORIGINS` - Allowed origins (default: *)

## Setting Up Gmail for Contact Form

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Security → 2-Step Verification → Turn ON

### Step 2: Create an App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Click "Generate"
4. Copy the 16-character password (no spaces needed)

### Step 3: Set Environment Variables
```
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  (your app password)
RECIPIENT_EMAIL=redweynemk@gmail.com
```

## Running Locally

### Frontend
```bash
cd frontend && PORT=5000 npm start
```

### Backend
```bash
cd backend && uvicorn server:app --host localhost --port 8000
```

## API Endpoints
- `POST /api/contact` - Submit contact form (sends email)
- `GET /api/health` - Health check with SMTP status
- `GET /api/` - Basic API info

## VPS Deployment Guide

### Prerequisites
- Node.js 20+
- Python 3.11+
- Nginx (recommended for production)

### Step 1: Environment Variables
Create environment files:

**Backend** (`backend/.env`):
```
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=redweynemk@gmail.com
CORS_ORIGINS=https://yourdomain.com
```

**Frontend** (`frontend/.env`):
```
REACT_APP_BACKEND_URL=https://yourdomain.com
```

### Step 2: Build Frontend
```bash
cd frontend
npm install
npm run build
```

### Step 3: Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8000
```

For production, use PM2:
```bash
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8000" --name portfolio-api
```

### Step 4: Nginx Configuration
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
```bash
curl https://yourdomain.com/api/health
```

## Recent Changes
- 2024-11-26: Replaced MongoDB with Gmail SMTP for contact form
- 2024-11-26: Added error boundary for Spline/WebGL failures
- 2024-11-26: Configured for Replit environment (port 5000, allowedHosts)
- 2024-11-26: Added VPS deployment documentation
