#!/bin/bash

# Redweyne Portfolio - VPS Deployment Script
# Run this script on your VPS after cloning the repository

set -e

PROJECT_DIR="/var/www/redweyne-portfolio"

echo "==================================="
echo "  Redweyne Portfolio Deployment"
echo "==================================="

# Check if running as correct user
if [ "$EUID" -eq 0 ]; then
    echo "Please run as non-root user with sudo privileges"
    exit 1
fi

# Update system
echo "[1/7] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js from NodeSource
echo "[2/7] Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install dependencies
echo "[3/7] Installing dependencies..."
sudo apt install -y nginx python3-pip python3-venv certbot python3-certbot-nginx

# Install PM2
sudo npm install -g pm2

# Build frontend
echo "[4/7] Building frontend..."
cd "$PROJECT_DIR/frontend"
npm install --legacy-peer-deps
npm run build

# Setup backend
echo "[5/7] Setting up backend..."
cd "$PROJECT_DIR/backend"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
deactivate

# Check for .env file
if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
    echo ""
    echo "Creating .env template..."
    cat > "$PROJECT_DIR/backend/.env" << EOF
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=redweynemk@gmail.com
CORS_ORIGINS=https://redweyne.com,https://www.redweyne.com
TRUSTED_PROXIES=127.0.0.1,::1
EOF
    echo "Please edit $PROJECT_DIR/backend/.env with your SMTP credentials!"
fi

# Setup PM2
echo "[6/7] Setting up PM2..."
mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"
pm2 start deploy/ecosystem.config.cjs --env production
pm2 save
pm2 startup | tail -1 | bash || true

# Setup Nginx
echo "[7/7] Configuring Nginx..."
sudo cp "$PROJECT_DIR/deploy/nginx.conf" /etc/nginx/sites-available/redweyne
sudo ln -sf /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "==================================="
echo "  Deployment Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Edit $PROJECT_DIR/backend/.env with your SMTP credentials"
echo "2. Run: sudo certbot --nginx -d redweyne.com -d www.redweyne.com"
echo "3. Run: pm2 restart redweyne-portfolio"
echo ""
echo "Useful commands:"
echo "  pm2 logs redweyne-portfolio  - View logs"
echo "  pm2 restart redweyne-portfolio - Restart app"
echo ""
