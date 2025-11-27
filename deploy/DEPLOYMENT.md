# Portfolio Deployment Guide - redweyne.com

**Your Configuration:**
- Domain: `redweyne.com`
- App runs on port `5000` (single unified process)

---

## Prerequisites

- Ubuntu 20.04+ VPS with at least 1GB RAM
- Root or sudo access
- Domain DNS already pointing to your VPS IP

---

## Step 1: Connect to Your VPS

```bash
ssh root@YOUR_VPS_IP
```

---

## Step 2: Install System Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 from NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installed
node --version
# Should show: v20.x.x

# Install other dependencies
sudo apt install -y nginx python3-pip python3-venv certbot python3-certbot-nginx git

# For Python 3.12+ systems, also install the specific venv package
sudo apt install -y python3.12-venv 2>/dev/null || sudo apt install -y python3.11-venv 2>/dev/null || true

# Install PM2 globally
sudo npm install -g pm2

# Verify PM2 installed
pm2 --version
```

---

## Step 3: Clone Repository

**READ THIS CAREFULLY - The dot at the end is CRITICAL!**

```bash
# Create and enter project directory
mkdir -p /var/www/redweyne-portfolio
cd /var/www/redweyne-portfolio

# Verify you're in the right directory
pwd
# MUST show: /var/www/redweyne-portfolio

# Clone repository INTO CURRENT DIRECTORY (note the dot!)
git clone https://github.com/Redweyne/PortfolioEmergent.git .
#                                                          ^
#                                                          |
#                                            THIS DOT IS CRITICAL!

# Verify the clone worked correctly
ls -la
# You should see: frontend/  backend/  deploy/  README.md  etc.
```

**If you forgot the dot and see a PortfolioEmergent folder instead:**
```bash
# Fix it by moving files up
mv PortfolioEmergent/* .
mv PortfolioEmergent/.* . 2>/dev/null
rmdir PortfolioEmergent

# Verify fix worked
ls frontend/package.json
# Should show: frontend/package.json
```

---

## Step 4: Build Frontend

```bash
# Navigate to frontend directory
cd /var/www/redweyne-portfolio/frontend

# Verify you're in the correct directory
pwd
# MUST show: /var/www/redweyne-portfolio/frontend

# Verify package.json exists
ls package.json
# MUST show: package.json (if not, you're in the wrong directory!)

# Install dependencies (this takes a few minutes)
npm install --legacy-peer-deps

# Build the production bundle (this also takes a few minutes)
npm run build

# Verify build succeeded
ls build/index.html
# MUST show: build/index.html
```

**If build fails:**
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

## Step 5: Setup Backend

```bash
# Navigate to backend directory
cd /var/www/redweyne-portfolio/backend

# Verify you're in the correct directory
pwd
# MUST show: /var/www/redweyne-portfolio/backend

# Verify requirements.txt exists
ls requirements.txt
# MUST show: requirements.txt

# Download standalone virtualenv (works even if apt has issues)
wget https://bootstrap.pypa.io/virtualenv.pyz

# Create Python virtual environment
python3 virtualenv.pyz venv

# Activate virtual environment
source venv/bin/activate

# Your prompt should now show (venv) at the beginning

# Install Python dependencies
pip install -r requirements.txt

# Verify gunicorn installed
which gunicorn
# Should show: /var/www/redweyne-portfolio/backend/venv/bin/gunicorn

# Deactivate virtual environment
deactivate
```

---

## Step 6: Configure Environment Variables

```bash
# Make sure you're in the backend directory
cd /var/www/redweyne-portfolio/backend

# Create environment file
cat > .env << 'EOF'
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=redweynemk@gmail.com
CORS_ORIGINS=https://redweyne.com,https://www.redweyne.com
TRUSTED_PROXIES=127.0.0.1,::1
EOF

# Edit with your actual credentials
nano .env
```

**SMTP Setup (Gmail):**
1. Go to https://myaccount.google.com/apppasswords
2. Generate an "App Password" for "Mail"
3. Use that 16-character password (not your regular password)

---

## Step 7: Start Application with PM2

```bash
# Navigate to project root
cd /var/www/redweyne-portfolio

# Verify you're in the correct directory
pwd
# MUST show: /var/www/redweyne-portfolio

# Create logs directory
mkdir -p logs

# Start the application
pm2 start deploy/ecosystem.config.cjs --env production

# Verify it's running
pm2 status
# Should show: redweyne-portfolio │ online

# Test the API locally
curl http://localhost:5000/api/health
# Should return: {"status":"healthy"...}

# If it's not working, check logs:
pm2 logs redweyne-portfolio --lines 50

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# RUN THE COMMAND IT OUTPUTS!
```

---

## Step 8: Configure Nginx

```bash
# Copy nginx config
sudo cp /var/www/redweyne-portfolio/deploy/nginx-initial.conf /etc/nginx/sites-available/redweyne

# Enable the site
sudo ln -sf /etc/nginx/sites-available/redweyne /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t
# MUST show: syntax is ok / test is successful

# Reload nginx
sudo systemctl reload nginx

# Test through nginx
curl http://localhost/api/health
# Should return: {"status":"healthy"...}
```

---

## Step 9: Get SSL Certificate

**Your domain MUST already point to this VPS IP!**

```bash
# Verify DNS is working
dig +short redweyne.com
# Should show your VPS IP

# Get SSL certificate
sudo certbot --nginx -d redweyne.com -d www.redweyne.com

# Follow the prompts, select option to redirect HTTP to HTTPS

# Verify SSL works
curl https://redweyne.com/api/health
# Should return: {"status":"healthy"...}
```

---

## Step 10: Final Verification

```bash
# Check everything is running
pm2 status
sudo systemctl status nginx

# Test the full site
curl -I https://redweyne.com
# Should show: HTTP/2 200

curl https://redweyne.com/api/health
# Should return health check JSON
```

**Visit https://redweyne.com in your browser!**

---

## Maintenance Commands

```bash
# View application logs
pm2 logs redweyne-portfolio

# Restart application
pm2 restart redweyne-portfolio

# Check status
pm2 status

# Update deployment (after pushing changes to GitHub)
cd /var/www/redweyne-portfolio
git pull
cd frontend && npm install --legacy-peer-deps && npm run build
cd ../backend && source venv/bin/activate && pip install -r requirements.txt && deactivate
pm2 restart redweyne-portfolio
```

---

## Troubleshooting

**"No such file or directory" errors:**
```bash
# Verify project structure
ls /var/www/redweyne-portfolio/
# Must contain: frontend/ backend/ deploy/

# If you see PortfolioEmergent/ instead, you cloned wrong:
cd /var/www/redweyne-portfolio
mv PortfolioEmergent/* .
mv PortfolioEmergent/.* . 2>/dev/null
rmdir PortfolioEmergent
```

**App not starting:**
```bash
pm2 logs redweyne-portfolio --lines 100
```

**Test backend manually:**
```bash
cd /var/www/redweyne-portfolio/backend
source venv/bin/activate
python -c "from server import app; print('Server OK')"
```

**Nginx errors:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**SSL certificate issues:**
```bash
sudo certbot renew --dry-run
```

**Contact form not sending emails:**
```bash
# Check SMTP configuration
cat /var/www/redweyne-portfolio/backend/.env
# Verify SMTP_EMAIL and SMTP_PASSWORD are set correctly
```
