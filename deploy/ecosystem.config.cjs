module.exports = {
  apps: [
    {
      name: 'redweyne-portfolio',
      cwd: '/var/www/redweyne-portfolio/backend',
      script: 'gunicorn',
      args: '--bind 127.0.0.1:5000 --workers 4 --worker-class uvicorn.workers.UvicornWorker server:app',
      interpreter: 'none',
      env_production: {
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/var/www/redweyne-portfolio/logs/error.log',
      out_file: '/var/www/redweyne-portfolio/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    }
  ]
};
