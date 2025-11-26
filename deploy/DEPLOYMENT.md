# VPS Deployment Guide for Redweyne Portfolio

## Prerequisites

- Ubuntu 20.04+ or Debian 11+
- Node.js 18+ and npm
- Python 3.11+
- Nginx
- PM2 (`npm install -g pm2`)
- Certbot for SSL

## Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nginx python3-pip python3-venv nodejs npm certbot python3-certbot-nginx

# Install PM2 globally
sudo npm install -g pm2
```

## Step 2: Clone and Setup Project

```bash
# Create project directory
sudo mkdir -p /var/www/redweyne-portfolio
cd /var/www/redweyne-portfolio

# Clone your repository (or upload files)
# git clone your-repo-url .

# Set ownership
sudo chown -R $USER:$USER /var/www/redweyne-portfolio
```

## Step 3: Backend Setup

```bash
cd /var/www/redweyne-portfolio/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Create .env file
cat > .env << EOF
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@example.com
CORS_ORIGINS=https://redweyne.com,https://www.redweyne.com
TRUSTED_PROXIES=127.0.0.1,::1
EOF

# Test the backend
uvicorn server:app --host 127.0.0.1 --port 8000
```

## Step 4: Frontend Build

```bash
cd /var/www/redweyne-portfolio/frontend

# Install dependencies
npm install --legacy-peer-deps

# Update API URL in your frontend config to point to your domain
# Then build
npm run build
```

## Step 5: Nginx Configuration

```bash
# Copy nginx config
sudo cp /var/www/redweyne-portfolio/deploy/nginx.conf /etc/nginx/sites-available/redweyne

# The config is already set up for redweyne.com
# Review and adjust if needed:
sudo nano /etc/nginx/sites-available/redweyne

# Enable the site
sudo ln -s /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Add rate limiting zone to nginx.conf main context
# Add this line to /etc/nginx/nginx.conf inside the http {} block:
# limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 6: SSL Certificate

```bash
# Get SSL certificate (make sure your domain points to your server first)
sudo certbot --nginx -d redweyne.com -d www.redweyne.com

# Auto-renewal is set up automatically
```

## Step 7: PM2 Process Management

```bash
# Copy ecosystem config
cp /var/www/redweyne-portfolio/deploy/ecosystem.config.js /var/www/redweyne-portfolio/

# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start the backend with PM2
cd /var/www/redweyne-portfolio
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Run the command it outputs
```

## Step 8: Firewall Setup

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Maintenance Commands

```bash
# View backend logs
pm2 logs redweyne-backend

# Restart backend
pm2 restart redweyne-backend

# Check status
pm2 status

# Update frontend
cd /var/www/redweyne-portfolio/frontend
git pull
npm run build
sudo systemctl reload nginx

# Update backend
cd /var/www/redweyne-portfolio/backend
git pull
source venv/bin/activate
pip install -r requirements.txt
pm2 restart redweyne-backend
```

## Spam Protection Features

The backend includes:

1. **Honeypot Fields**: Hidden form fields (`website` and `phone_confirm`) that bots fill out but humans don't see. If filled, the submission is silently accepted (returns 201) but the email is not sent. This prevents bots from detecting that they've been caught.

2. **Rate Limiting**: Max 5 contact form submissions per IP per hour. Adjust `MAX_REQUESTS_PER_HOUR` in server.py if needed. The backend uses `ProxyHeadersMiddleware` to correctly identify client IPs when behind Nginx. Set `TRUSTED_PROXIES=127.0.0.1,::1` in your .env file (already configured in the setup above).

3. **Nginx Rate Limiting**: 10 requests per second to API endpoints with burst of 20.

## Frontend Honeypot Setup

Add these hidden fields to your contact form (they should be invisible to users):

```jsx
{/* Honeypot fields - hidden from real users */}
<input 
  type="text" 
  name="website" 
  style={{ display: 'none' }} 
  tabIndex={-1} 
  autoComplete="off"
/>
<input 
  type="text" 
  name="phone_confirm" 
  style={{ display: 'none' }} 
  tabIndex={-1} 
  autoComplete="off"
/>
```

## Troubleshooting

### Backend not starting
```bash
# Check logs
pm2 logs redweyne-backend --lines 50

# Test manually
cd /var/www/redweyne-portfolio/backend
source venv/bin/activate
python -c "from server import app; print('OK')"
```

### Nginx errors
```bash
# Check nginx error log
sudo tail -f /var/log/nginx/error.log

# Test config
sudo nginx -t
```

### SSL issues
```bash
# Renew certificate manually
sudo certbot renew --dry-run
```
