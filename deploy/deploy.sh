#!/bin/bash

# Redweyne Portfolio - VPS Deployment Script
# Run this script on your VPS after cloning the repository

set -e

PROJECT_DIR="/var/www/redweyne-portfolio"
DOMAIN="redweyne.com"

echo "==================================="
echo "  Redweyne Portfolio Deployment"
echo "==================================="

# Check if running as correct user
if [ "$EUID" -eq 0 ]; then
    echo "Please run as non-root user with sudo privileges"
    exit 1
fi

# Update system
echo "[1/8] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "[2/8] Installing dependencies..."
sudo apt install -y nginx python3-pip python3-venv nodejs npm certbot python3-certbot-nginx

# Install PM2
echo "[3/8] Installing PM2..."
sudo npm install -g pm2

# Setup backend
echo "[4/8] Setting up backend..."
cd "$PROJECT_DIR/backend"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
deactivate

# Check for .env file
if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
    echo ""
    echo "WARNING: Backend .env file not found!"
    echo "Please create $PROJECT_DIR/backend/.env with:"
    echo "  SMTP_EMAIL=your-gmail@gmail.com"
    echo "  SMTP_PASSWORD=your-app-password"
    echo "  RECIPIENT_EMAIL=your-email@example.com"
    echo "  CORS_ORIGINS=https://$DOMAIN"
    echo ""
fi

# Build frontend
echo "[5/8] Building frontend..."
cd "$PROJECT_DIR/frontend"
npm install --legacy-peer-deps
npm run build

# Setup Nginx
echo "[6/8] Configuring Nginx..."
sudo cp "$PROJECT_DIR/deploy/nginx.conf" "/etc/nginx/sites-available/redweyne"

# Update domain in nginx config
sudo sed -i "s/yourdomain.com/$DOMAIN/g" "/etc/nginx/sites-available/redweyne"

# Enable site
sudo ln -sf /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Add rate limiting to nginx main config if not exists
if ! grep -q "limit_req_zone" /etc/nginx/nginx.conf; then
    sudo sed -i '/http {/a \    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;' /etc/nginx/nginx.conf
fi

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Setup PM2
echo "[7/8] Setting up PM2..."
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

cd "$PROJECT_DIR"
pm2 start deploy/ecosystem.config.js
pm2 save

# Setup PM2 startup
pm2 startup | tail -1 | bash || true

# Setup firewall
echo "[8/8] Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo ""
echo "==================================="
echo "  Deployment Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Point your domain ($DOMAIN) to this server's IP"
echo "2. Run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "3. Create backend/.env with your SMTP credentials"
echo "4. Run: pm2 restart redweyne-backend"
echo ""
echo "Useful commands:"
echo "  pm2 logs redweyne-backend  - View backend logs"
echo "  pm2 restart redweyne-backend - Restart backend"
echo "  sudo nginx -t && sudo systemctl reload nginx - Reload nginx"
echo ""
