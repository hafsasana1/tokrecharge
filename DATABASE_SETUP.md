# Database Setup Guide for TokRecharge.com

## Overview
TokRecharge.com uses PostgreSQL as the primary database with Drizzle ORM for schema management and migrations. This guide covers setup for both development and production environments.

## Development Setup

### Using Neon Database (Recommended)
1. **Create Neon Account**: Visit [neon.tech](https://neon.tech) and create a free account
2. **Create Database**: Create a new project named "tokrecharge"
3. **Get Connection String**: Copy the connection string from your dashboard
4. **Set Environment Variable**:
   ```bash
   export DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

### Using Local PostgreSQL
1. **Install PostgreSQL**:
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   ```

2. **Start PostgreSQL Service**:
   ```bash
   sudo systemctl start postgresql
   ```

3. **Create Database and User**:
   ```sql
   sudo -u postgres psql
   CREATE DATABASE tokrecharge;
   CREATE USER tokrecharge_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE tokrecharge TO tokrecharge_user;
   \q
   ```

4. **Set Environment Variable**:
   ```bash
   export DATABASE_URL="postgresql://tokrecharge_user:your_secure_password@localhost:5432/tokrecharge"
   ```

## Production Setup

### Option 1: Neon Database (Serverless)
1. **Upgrade to Pro Plan** for production workloads
2. **Enable Connection Pooling** in Neon dashboard
3. **Set up Read Replicas** for better performance
4. **Configure Backup Retention** (automatic with Neon)

### Option 2: Traditional PostgreSQL Server
1. **Server Setup**:
   ```bash
   # Install PostgreSQL 15+
   sudo apt update
   sudo apt install postgresql-15 postgresql-contrib-15
   
   # Configure PostgreSQL
   sudo systemctl enable postgresql
   sudo systemctl start postgresql
   ```

2. **Database Configuration**:
   ```sql
   sudo -u postgres psql
   CREATE DATABASE tokrecharge_prod;
   CREATE USER tokrecharge_prod WITH PASSWORD 'very_secure_production_password';
   GRANT ALL PRIVILEGES ON DATABASE tokrecharge_prod TO tokrecharge_prod;
   
   -- Enable additional security
   ALTER USER tokrecharge_prod CREATEDB;
   \q
   ```

3. **Performance Tuning** (`/etc/postgresql/15/main/postgresql.conf`):
   ```conf
   # Memory settings
   shared_buffers = 256MB
   effective_cache_size = 1GB
   work_mem = 4MB
   maintenance_work_mem = 64MB
   
   # Connection settings
   max_connections = 100
   
   # Logging
   log_statement = 'mod'
   log_min_duration_statement = 1000
   ```

### Option 3: Cloud Providers

#### AWS RDS
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier tokrecharge-prod \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --allocated-storage 20 \
  --master-username tokrecharge \
  --master-user-password your_secure_password \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name default
```

#### Google Cloud SQL
```bash
# Create Cloud SQL instance
gcloud sql instances create tokrecharge-prod \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

## Schema Migration

### Initial Setup
```bash
# Install dependencies
npm install drizzle-orm drizzle-kit @neondatabase/serverless

# Run initial migration
npm run db:push

# Or generate and run migrations
npm run db:generate
npm run db:migrate
```

### Migration Scripts
```bash
# Generate migration
npx drizzle-kit generate:pg --schema=./shared/schema.ts

# Apply migration
npx drizzle-kit push:pg --schema=./shared/schema.ts
```

## Environment Configuration

### Required Environment Variables
```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Security
JWT_SECRET="your-256-bit-secret-key-here"
SESSION_SECRET="another-secure-secret-for-sessions"

# Application
NODE_ENV="production"
PORT="5000"
TRUST_PROXY="true"

# Optional: External Services
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
GOOGLE_TAG_MANAGER_ID="GTM-XXXXXXX"
```

### Production .env Example
```env
# Database Configuration
DATABASE_URL=postgresql://tokrecharge:secure_password@localhost:5432/tokrecharge_prod

# Security Configuration
JWT_SECRET=your-super-secure-256-bit-jwt-secret-key-change-this-in-production
SESSION_SECRET=your-super-secure-session-secret-key-change-this-too

# Server Configuration
NODE_ENV=production
PORT=5000
TRUST_PROXY=true

# Optional Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

## Database Schema Overview

### Core Tables
- **tools**: Calculator and utility tools metadata
- **countries**: Currency information and exchange rates
- **gifts**: TikTok gift database with costs and values
- **blog_posts**: Content management system
- **recharge_packages**: Country-specific pricing packages

### Admin System Tables
- **admin_users**: Admin authentication
- **site_settings**: Dynamic site configuration
- **visitor_logs**: Analytics and tracking
- **ads_placements**: AdSense management

### Analytics Tables
- **daily_stats**: Daily visitor statistics
- **country_stats**: Geographic analytics
- **page_views**: Page-level tracking

## Backup and Maintenance

### Automated Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/tokrecharge"
mkdir -p $BACKUP_DIR

pg_dump $DATABASE_URL > $BACKUP_DIR/tokrecharge_$DATE.sql
gzip $BACKUP_DIR/tokrecharge_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

### Database Maintenance
```sql
-- Vacuum and analyze regularly
VACUUM ANALYZE;

-- Update table statistics
ANALYZE;

-- Check database size
SELECT pg_size_pretty(pg_database_size('tokrecharge_prod'));

-- Monitor active connections
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';
```

## Security Best Practices

### Database Security
1. **Use SSL/TLS** for all connections
2. **Limit database user permissions** to minimum required
3. **Enable connection pooling** to prevent connection exhaustion
4. **Regular security updates** for PostgreSQL
5. **Monitor for suspicious queries** and connections

### Connection Security
```bash
# SSL Configuration in connection string
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslcert=client-cert.pem&sslkey=client-key.pem&sslrootcert=ca-cert.pem"
```

### Access Control
```sql
-- Create read-only user for analytics
CREATE USER analytics_reader WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE tokrecharge_prod TO analytics_reader;
GRANT USAGE ON SCHEMA public TO analytics_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_reader;
```

## Monitoring and Performance

### Key Metrics to Monitor
- Connection count and pool usage
- Query execution times
- Database size and growth
- Cache hit ratios
- Lock contention

### Performance Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_visitor_logs_date ON visitor_logs(created_at);
CREATE INDEX idx_tools_category ON tools(category);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM tools WHERE category = 'calculator';
```

## Troubleshooting

### Common Issues
1. **Connection timeouts**: Increase connection pool size
2. **Slow queries**: Add appropriate indexes
3. **Memory issues**: Tune PostgreSQL memory settings
4. **Migration failures**: Check schema compatibility

### Debug Commands
```bash
# Test database connection
node -e "const { neon } = require('@neondatabase/serverless'); const sql = neon(process.env.DATABASE_URL); sql\`SELECT NOW()\`.then(console.log);"

# Check table sizes
psql $DATABASE_URL -c "SELECT schemaname,tablename,attname,n_distinct,correlation FROM pg_stats;"

# Monitor active queries
psql $DATABASE_URL -c "SELECT pid, now() - pg_stat_activity.query_start AS duration, query FROM pg_stat_activity WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';"
```

This guide provides comprehensive instructions for setting up and maintaining the TokRecharge.com database in various environments, from development to production deployment.