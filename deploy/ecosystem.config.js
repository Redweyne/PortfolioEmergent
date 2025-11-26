module.exports = {
  apps: [
    {
      name: 'redweyne-backend',
      cwd: '/var/www/redweyne-portfolio/backend',
      script: 'venv/bin/gunicorn',
      args: '--bind 127.0.0.1:8000 --workers 4 --worker-class uvicorn.workers.UvicornWorker server:app',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      env_file: '/var/www/redweyne-portfolio/backend/.env',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/var/log/pm2/redweyne-backend-error.log',
      out_file: '/var/log/pm2/redweyne-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    }
  ]
};
