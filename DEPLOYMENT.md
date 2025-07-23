# TokRecharge.com Deployment Guide

## Quick Deployment Options

### 1. Replit Deployment (Recommended for Development)
```bash
# The app is already configured for Replit
# Simply click "Deploy" in the Replit interface
# Or use Replit CLI:
replit deploy
```

### 2. Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t tokrecharge .
docker run -p 5000:5000 --env-file .env tokrecharge
```

### 3. VPS/Cloud Server Deployment
```bash
# Clone repository
git clone https://github.com/yourusername/tokrecharge.git
cd tokrecharge

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js --env production
```

## Environment Configuration

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Security
JWT_SECRET=your-super-secure-256-bit-jwt-secret
SESSION_SECRET=your-super-secure-session-secret

# Server
NODE_ENV=production
PORT=5000
TRUST_PROXY=true

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
FACEBOOK_PIXEL_ID=123456789
```

## Platform-Specific Deployment

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel dashboard
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set run command: `node dist/index.js`
4. Add environment variables

### AWS EC2
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone https://github.com/yourusername/tokrecharge.git
cd tokrecharge
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## Database Setup for Production

### Neon Database (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project "tokrecharge-prod"
3. Copy connection string
4. Set DATABASE_URL environment variable

### PostgreSQL Setup
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb tokrecharge_prod
sudo -u postgres createuser tokrecharge_user

# Set password
sudo -u postgres psql
ALTER USER tokrecharge_user PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE tokrecharge_prod TO tokrecharge_user;
\q
```

## SSL/HTTPS Configuration

### Using Nginx (Recommended)
```nginx
server {
    listen 80;
    server_name tokrecharge.com www.tokrecharge.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tokrecharge.com www.tokrecharge.com;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using Cloudflare
1. Add domain to Cloudflare
2. Set DNS A record to server IP
3. Enable "Always Use HTTPS"
4. Set SSL/TLS to "Full (strict)"

## Performance Optimization

### Enable Gzip Compression
Already configured in Express server with compression middleware.

### CDN Configuration
```javascript
// Add to server configuration
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: false,
  lastModified: false
}));
```

### Database Connection Pooling
Already configured in Drizzle setup for optimal performance.

## Monitoring and Logging

### PM2 Monitoring
```bash
# View logs
pm2 logs

# Monitor performance
pm2 monit

# Restart application
pm2 restart tokrecharge
```

### Health Checks
The application includes health check endpoint at `/api/health`:
```bash
curl https://tokrecharge.com/api/health
```

## Security Checklist

- ✅ Environment variables secure
- ✅ HTTPS enabled
- ✅ Database credentials encrypted
- ✅ Rate limiting implemented
- ✅ CORS configured
- ✅ Helmet security headers
- ✅ Input validation
- ✅ SQL injection protection
- ✅ XSS protection
- ✅ CSRF protection

## Backup Strategy

### Database Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backups/tokrecharge_$DATE.sql
gzip backups/tokrecharge_$DATE.sql

# Keep last 30 days
find backups/ -name "*.sql.gz" -mtime +30 -delete
```

### File Backups
```bash
# Backup application files
tar -czf backups/app_$DATE.tar.gz --exclude=node_modules --exclude=.git .
```

## Scaling Considerations

### Horizontal Scaling
- Use PM2 cluster mode (already configured)
- Set up load balancer (Nginx/Cloudflare)
- Consider read replicas for database

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Enable Redis caching

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT environment variable
2. **Database connection failed**: Check DATABASE_URL
3. **Memory issues**: Increase server RAM or optimize queries
4. **SSL errors**: Verify certificate configuration

### Debug Commands
```bash
# Check application status
pm2 status

# View real-time logs
pm2 logs --lines 100

# Check database connection
node -e "console.log(process.env.DATABASE_URL)"

# Test API endpoints
curl -I https://tokrecharge.com/api/tools
```

This deployment guide covers multiple hosting options and configurations to ensure successful production deployment of TokRecharge.com.