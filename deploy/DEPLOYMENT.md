# Portfolio Deployment Guide - redweyne.com

**Your Configuration:**
- Domain: `redweyne.com`
- App runs on port `5000` (single unified process)

---

## Prerequisites

- Ubuntu 20.04+ VPS
- Python 3.11+
- Node.js 20+ (for building frontend)
- Nginx
- PM2 (`npm install -g pm2`)
- Certbot for SSL

---

## Step 1: Connect to Your VPS

```bash
ssh root@YOUR_VPS_IP
```

---

## Step 2: Install Dependencies

```bash
# Install Node.js from NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install other dependencies
sudo apt install -y nginx python3-pip python3-venv certbot python3-certbot-nginx

# Install PM2
sudo npm install -g pm2
```

---

## Step 3: Clone and Setup Project

```bash
# Create project directory
mkdir -p /var/www/redweyne-portfolio
cd /var/www/redweyne-portfolio

# Clone your repository (note the dot at the end)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

---

## Step 4: Build Frontend

```bash
cd /var/www/redweyne-portfolio/frontend

# Install dependencies
npm install --legacy-peer-deps

# Build static files
npm run build
```

---

## Step 5: Setup Backend

```bash
cd /var/www/redweyne-portfolio/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Create environment file
cat > .env << EOF
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=redweynemk@gmail.com
CORS_ORIGINS=https://redweyne.com,https://www.redweyne.com
TRUSTED_PROXIES=127.0.0.1,::1
EOF
```

**Edit the .env file with your actual SMTP credentials:**
```bash
nano .env
```

---

## Step 6: Start with PM2

```bash
cd /var/www/redweyne-portfolio

# Create logs directory
mkdir -p logs

# Start the application
pm2 start deploy/ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Run the command it outputs
```

**Verify it's running:**
```bash
pm2 status
curl http://localhost:5000/api/health
```

---

## Step 7: Configure Nginx

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/redweyne
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name redweyne.com www.redweyne.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name redweyne.com www.redweyne.com;

    ssl_certificate /etc/letsencrypt/live/redweyne.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/redweyne.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable and test:**
```bash
sudo ln -sf /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 8: Get SSL Certificate

```bash
sudo certbot --nginx -d redweyne.com -d www.redweyne.com
```

---

## Maintenance Commands

```bash
# View logs
pm2 logs redweyne-portfolio

# Restart app
pm2 restart redweyne-portfolio

# Check status
pm2 status

# Update deployment
cd /var/www/redweyne-portfolio
git pull
cd frontend && npm run build
pm2 restart redweyne-portfolio
```

---

## Troubleshooting

**App not starting:**
```bash
pm2 logs redweyne-portfolio --lines 50
```

**Test manually:**
```bash
cd /var/www/redweyne-portfolio/backend
source venv/bin/activate
python -c "from server import app; print('OK')"
```

**Nginx errors:**
```bash
sudo tail -f /var/log/nginx/error.log
sudo nginx -t
```
