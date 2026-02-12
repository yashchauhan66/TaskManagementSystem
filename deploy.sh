#!/bin/bash

# Production Deployment Script for Task Management System

echo "🚀 Starting production deployment..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional)
echo "🧹 Cleaning up old images..."
docker system prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

# Show logs
echo "📋 Showing recent logs..."
docker-compose logs --tail=50

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://13.49.245.39"
echo "🔧 Backend: http://13.49.245.39:5000"
