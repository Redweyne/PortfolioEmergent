from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)

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
        
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully from {sender_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def submit_contact_message(input: ContactMessageCreate):
    """Submit a contact form message - sends email directly"""
    
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
