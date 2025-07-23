# TokRecharge.com - Complete Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying TokRecharge.com TikTok calculator website to a live server with PostgreSQL database integration. The application is built with React, Express.js, TypeScript, and PostgreSQL using Drizzle ORM.

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git repository access
- Domain name (optional)
- SSL certificate (recommended)

## Quick Start - Local Development

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd tokrecharge

# Install all dependencies
npm install

# Install additional development dependencies if needed
npm install -D @types/node tsx typescript
```

### 2. Database Setup

#### Option A: Local PostgreSQL Installation

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE tokrecharge;
CREATE USER tokrecharge_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE tokrecharge TO tokrecharge_user;
\q
```

#### Option B: Cloud Database (Recommended)

Popular cloud PostgreSQL providers:
- **Neon Database** (Free tier available)
- **Supabase** (Free tier available)
- **Railway** (Free tier available)
- **AWS RDS**
- **Google Cloud SQL**
- **Azure Database**

### 3. Environment Configuration

Create `.env` file in project root:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"
PGHOST=localhost
PGPORT=5432
PGUSER=tokrecharge_user
PGPASSWORD=your_secure_password
PGDATABASE=tokrecharge

# Application Configuration
NODE_ENV=production
PORT=5000

# Security (Generate secure random strings)
JWT_SECRET=your_super_secure_jwt_secret_here
SESSION_SECRET=your_super_secure_session_secret_here

# Optional: Analytics & Services
GOOGLE_ANALYTICS_ID=your_ga_id
GOOGLE_SEARCH_CONSOLE_CODE=your_gsc_verification
FACEBOOK_PIXEL_ID=your_fb_pixel_id
```

### 4. Database Migration

```bash
# Push database schema to your database
npm run db:push

# Verify database connection
npm run db:check
```

### 5. Build and Start

```bash
# Build the application
npm run build

# Start production server
npm start

# Or for development
npm run dev
```

## Production Deployment Options

### Option 1: VPS/Dedicated Server (DigitalOcean, Linode, AWS EC2)

#### Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx

# Install PostgreSQL (if hosting database locally)
sudo apt install postgresql postgresql-contrib
```

#### Application Deployment

```bash
# Clone your repository
git clone <your-repo-url>
cd tokrecharge

# Install dependencies
npm ci --production

# Create environment file
sudo nano .env
# (Add your production environment variables)

# Build application
npm run build

# Push database schema
npm run db:push

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Nginx Configuration

Create `/etc/nginx/sites-available/tokrecharge`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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

    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:5000;
    }
}
```

Enable site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/tokrecharge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Platform as a Service (Railway, Vercel, Heroku)

#### Railway Deployment

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Railway automatically builds and deploys

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# ... add all required environment variables

# Deploy to production
vercel --prod
```

### Option 3: Docker Deployment

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/tokrecharge
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=tokrecharge_user
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=tokrecharge
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Deploy with Docker:

```bash
# Build and start
docker-compose up -d

# Run database migrations
docker-compose exec app npm run db:push
```

## Database Migration from Development

### Export Development Data

```bash
# Export data from development database
pg_dump -h localhost -U username -d database_name > backup.sql

# Or export specific tables
pg_dump -h localhost -U username -d database_name -t tools -t countries -t gifts > sample_data.sql
```

### Import to Production

```bash
# Import to production database
psql -h production_host -U username -d database_name < backup.sql

# Or use database-specific tools (pgAdmin, DBeaver, etc.)
```

### Data Migration Script

Create `migrate-data.js`:

```javascript
import { db } from './server/db.js';
import { storage } from './server/storage.js';

async function migrateData() {
  try {
    // Check if data already exists
    const existingTools = await storage.getTools();
    
    if (existingTools.length === 0) {
      console.log('Populating initial data...');
      // Data population happens automatically in DatabaseStorage initialization
      console.log('✅ Data migration completed');
    } else {
      console.log('Data already exists, skipping migration');
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
```

Run migration:

```bash
node migrate-data.js
```

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_visitor_logs_visited_at ON visitor_logs(visited_at);
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_tools_slug ON tools(slug);
```

### Application Optimization

1. **Enable Gzip Compression**
```javascript
// In server/index.ts
import compression from 'compression';
app.use(compression());
```

2. **Static File Caching**
```javascript
// Serve static files with caching
app.use(express.static('dist/public', {
  maxAge: '1y',
  etag: true
}));
```

3. **Database Connection Pooling**
```javascript
// Already configured in server/db.ts
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Monitoring and Maintenance

### Health Check Endpoint

Add to `server/routes.ts`:

```javascript
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.select().from(tools).limit(1);
    
    res.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      error: error.message 
    });
  }
});
```

### Log Management

```bash
# View PM2 logs
pm2 logs

# View specific application logs
pm2 logs tokrecharge

# Log rotation
pm2 install pm2-logrotate
```

### Database Backup

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="tokrecharge_backup_$DATE.sql"

pg_dump -h $PGHOST -U $PGUSER -d $PGDATABASE > "/backups/$BACKUP_FILE"

# Keep only last 30 days of backups
find /backups -name "tokrecharge_backup_*.sql" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE"
```

Add to crontab:

```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

## Security Checklist

- [ ] Use HTTPS with valid SSL certificate
- [ ] Set strong JWT and session secrets
- [ ] Enable firewall (UFW) and close unnecessary ports
- [ ] Regular security updates
- [ ] Database access restrictions
- [ ] Rate limiting configured
- [ ] Input validation enabled
- [ ] CORS properly configured
- [ ] Security headers (Helmet.js)
- [ ] Regular backups

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify network connectivity
   - Check firewall settings

2. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify TypeScript configuration

3. **Performance Issues**
   - Check database query performance
   - Monitor memory usage
   - Review application logs

### Logs Location

- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- PostgreSQL logs: `/var/log/postgresql/`

## Support

For additional support:
- Check application logs for detailed error messages
- Review database connection settings
- Verify environment variables
- Test database connectivity

## Scaling

For high-traffic scenarios:
- Add database read replicas
- Implement Redis caching
- Use CDN for static assets
- Consider horizontal scaling with load balancers
- Monitor with tools like New Relic or DataDog

---

This deployment guide covers all aspects of hosting your TikTok calculator website with full database integration. Follow the steps appropriate for your hosting environment and requirements.