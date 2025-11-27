from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, timezone
from collections import defaultdict
import time
import asyncio

ROOT_DIR = Path(__file__).parent
STATIC_DIR = ROOT_DIR.parent / "frontend" / "build"
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

rate_limit_store = defaultdict(list)
RATE_LIMIT_WINDOW = 3600
MAX_REQUESTS_PER_HOUR = 5

def check_rate_limit(ip: str) -> bool:
    """Check if IP has exceeded rate limit for contact form"""
    current_time = time.time()
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if current_time - t < RATE_LIMIT_WINDOW]
    
    if len(rate_limit_store[ip]) >= MAX_REQUESTS_PER_HOUR:
        return False
    
    rate_limit_store[ip].append(current_time)
    return True

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)
    website: Optional[str] = Field(default=None, max_length=256)
    phone_confirm: Optional[str] = Field(default=None, max_length=256)

class ContactResponse(BaseModel):
    success: bool
    message: str

def send_email(name: str, sender_email: str, message_content: str) -> bool:
    """Send contact form message via Gmail SMTP"""
    
    smtp_email = os.environ.get('SMTP_EMAIL')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL', 'redweynemk@gmail.com')
    
    if not smtp_email or not smtp_password:
        logger.error("SMTP credentials not configured")
        return False
    
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact: Message from {name}"
        
        body = f"""
New message from your portfolio website:

----------------------------------------
FROM: {name}
EMAIL: {sender_email}
TIME: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}
----------------------------------------

MESSAGE:
{message_content}

----------------------------------------
Reply directly to this email to respond to {name}.
"""
        msg.attach(MIMEText(body, 'plain'))
        msg['Reply-To'] = sender_email
        
        with smtplib.SMTP('smtp.gmail.com', 587, timeout=10) as server:
            server.starttls(timeout=10)
            server.login(smtp_email, smtp_password)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully from {sender_email}")
        return True
        
    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"SMTP authentication failed - check email/password: {e}")
        return False
    except smtplib.SMTPException as e:
        logger.error(f"SMTP error: {e}")
        return False
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def submit_contact_message(input: ContactMessageCreate, request: Request):
    """Submit a contact form message - sends email directly"""
    
    client_ip = request.client.host if request.client else "unknown"
    
    if input.website or input.phone_confirm:
        logger.warning(f"Honeypot triggered from IP: {client_ip}")
        await asyncio.sleep(2)
        return ContactResponse(
            success=True,
            message="Message sent successfully! I'll get back to you soon."
        )
    
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail="Too many messages. Please try again later."
        )
    
    success = send_email(
        name=input.name,
        sender_email=input.email,
        message_content=input.message
    )
    
    if success:
        return ContactResponse(
            success=True,
            message="Message sent successfully! I'll get back to you soon."
        )
    else:
        raise HTTPException(
            status_code=500,
            detail="Failed to send message. Please try again or contact me directly via email."
        )

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    smtp_configured = bool(os.environ.get('SMTP_EMAIL') and os.environ.get('SMTP_PASSWORD'))
    return {
        "status": "healthy",
        "smtp_configured": smtp_configured,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

TRUSTED_PROXIES = os.environ.get('TRUSTED_PROXIES', '127.0.0.1,::1').split(',')
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts=TRUSTED_PROXIES)

# Mount static assets (CSS, JS, images)
if STATIC_DIR.exists() and (STATIC_DIR / "static").exists():
    app.mount("/static", StaticFiles(directory=STATIC_DIR / "static"), name="static_assets")
    
    # Serve index.html for client-side routing (catch-all for non-API routes)
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Serve React SPA for all non-API routes"""
        index_file = STATIC_DIR / "index.html"
        if index_file.exists():
            return FileResponse(index_file)
        return {"error": "SPA index.html not found"}
else:
    logger.warning(f"Static files not found at {STATIC_DIR}. Run 'npm run build' in frontend directory.")
