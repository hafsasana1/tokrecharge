#!/bin/bash

# TokRecharge.com Deployment Script
# This script helps deploy the TikTok calculator website to production

set -e

echo "🚀 TokRecharge.com Deployment Script"
echo "===================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create one with your database configuration."
    echo "Example .env content:"
    echo "DATABASE_URL=postgresql://username:password@host:port/database"
    echo "NODE_ENV=production"
    echo "JWT_SECRET=your-secure-jwt-secret"
    echo "SESSION_SECRET=your-secure-session-secret"
    exit 1
fi

echo "✅ Environment file found"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the application
echo "🔨 Building application..."
npm run build

# Run database migration
echo "🗄️ Setting up database..."
npm run db:push

echo "✅ Database schema applied successfully"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📱 Installing PM2 process manager..."
    npm install -g pm2
fi

# Start application with PM2
echo "🎯 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "📋 Next Steps:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Set up Nginx reverse proxy (see DEPLOYMENT_GUIDE.md)"
echo "3. Configure SSL certificate with Let's Encrypt"
echo "4. Set up monitoring and backups"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🔗 Access your app at: http://localhost:5000"