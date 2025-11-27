#!/bin/bash

# Redweyne Portfolio - VPS Deployment Script
# This script automates the deployment process
# Run from anywhere - it will set up everything

set -e  # Exit on any error

PROJECT_DIR="/var/www/redweyne-portfolio"
REPO_URL="https://github.com/Redweyne/PortfolioEmergent.git"

echo "==================================="
echo "  Redweyne Portfolio Deployment"
echo "==================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root: sudo bash deploy.sh"
    exit 1
fi

# Step 1: Update system
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y

# Step 2: Install Node.js
echo "[2/8] Installing Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi
echo "Node.js version: $(node --version)"

# Step 3: Install other dependencies
echo "[3/8] Installing dependencies..."
apt install -y nginx python3-pip python3-venv certbot python3-certbot-nginx git

# Install version-specific venv for Python 3.12+
PYTHON_VERSION=$(python3 --version | grep -oP '\d+\.\d+')
apt install -y python${PYTHON_VERSION}-venv 2>/dev/null || true

# Install PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi
echo "PM2 version: $(pm2 --version)"

# Step 4: Setup project directory and clone
echo "[4/8] Setting up project..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Check if already cloned
if [ -d "$PROJECT_DIR/frontend" ] && [ -d "$PROJECT_DIR/backend" ]; then
    echo "Project already exists, pulling latest..."
    git pull
else
    # Clean directory if needed
    rm -rf "$PROJECT_DIR"/*
    rm -rf "$PROJECT_DIR"/.[!.]*
    
    # Clone with the dot!
    git clone "$REPO_URL" .
    
    # Verify clone worked
    if [ ! -d "$PROJECT_DIR/frontend" ]; then
        echo "ERROR: Clone failed! frontend directory not found."
        echo "Expected structure not found at $PROJECT_DIR"
        exit 1
    fi
fi

echo "Project structure verified:"
ls -la "$PROJECT_DIR"

# Step 5: Build frontend
echo "[5/8] Building frontend..."
cd "$PROJECT_DIR/frontend"

if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found in $PROJECT_DIR/frontend"
    exit 1
fi

npm install --legacy-peer-deps
npm run build

if [ ! -f "build/index.html" ]; then
    echo "ERROR: Frontend build failed! build/index.html not found."
    exit 1
fi
echo "Frontend build successful!"

# Step 6: Setup backend
echo "[6/8] Setting up backend..."
cd "$PROJECT_DIR/backend"

if [ ! -f "requirements.txt" ]; then
    echo "ERROR: requirements.txt not found in $PROJECT_DIR/backend"
    exit 1
fi

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Verify gunicorn installed
if [ ! -f "venv/bin/gunicorn" ]; then
    echo "ERROR: gunicorn not installed correctly"
    exit 1
fi
echo "Backend setup successful!"

# Create .env if it doesn't exist
if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
    echo ""
    echo "Creating .env template..."
    cat > "$PROJECT_DIR/backend/.env" << 'EOF'
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=redweynemk@gmail.com
CORS_ORIGINS=https://redweyne.com,https://www.redweyne.com
TRUSTED_PROXIES=127.0.0.1,::1
EOF
    echo "IMPORTANT: Edit $PROJECT_DIR/backend/.env with your SMTP credentials!"
fi

# Step 7: Setup PM2
echo "[7/8] Setting up PM2..."
mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

# Stop existing if running
pm2 delete redweyne-portfolio 2>/dev/null || true

# Start fresh
pm2 start deploy/ecosystem.config.cjs --env production
pm2 save

# Setup startup
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

echo "PM2 status:"
pm2 status

# Step 8: Setup Nginx
echo "[8/8] Configuring Nginx..."
cp "$PROJECT_DIR/deploy/nginx-initial.conf" /etc/nginx/sites-available/redweyne
ln -sf /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

if nginx -t; then
    systemctl reload nginx
    echo "Nginx configured successfully!"
else
    echo "ERROR: Nginx configuration test failed!"
    exit 1
fi

# Final verification
echo ""
echo "==================================="
echo "  Deployment Complete!"
echo "==================================="
echo ""
echo "Verifying deployment..."
sleep 2

# Test health endpoint
if curl -s http://localhost:5002/api/health | grep -q "healthy"; then
    echo "✓ Backend health check passed"
else
    echo "✗ Backend health check failed - check logs with: pm2 logs redweyne-portfolio"
fi

if curl -s http://localhost/api/health | grep -q "healthy"; then
    echo "✓ Nginx proxy working"
else
    echo "✗ Nginx proxy failed - check: sudo nginx -t"
fi

echo ""
echo "==================================="
echo "  NEXT STEPS"
echo "==================================="
echo ""
echo "1. Edit your SMTP credentials:"
echo "   nano $PROJECT_DIR/backend/.env"
echo ""
echo "2. Make sure your domain points to this server's IP"
echo ""
echo "3. Get SSL certificate:"
echo "   sudo certbot --nginx -d redweyne.com -d www.redweyne.com"
echo ""
echo "4. Restart the app after editing .env:"
echo "   pm2 restart redweyne-portfolio"
echo ""
echo "5. Verify everything:"
echo "   curl https://redweyne.com/api/health"
echo ""
