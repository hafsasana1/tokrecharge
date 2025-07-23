module.exports = {
  apps: [{
    name: 'tokrecharge',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true,
    // Restart strategies
    min_uptime: '10s',
    max_restarts: 5,
    // Graceful shutdown
    kill_timeout: 5000,
    // Monitoring
    monitoring: false,
    // Environment variables
    env_file: '.env'
  }],

  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:username/tokrecharge.git',
      path: '/var/www/tokrecharge',
      'post-deploy': 'npm install && npm run build && npm run db:push && pm2 reload ecosystem.config.js --env production'
    }
  }
};