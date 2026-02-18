#!/bin/bash

echo "🔧 EC2 Quick Fix Script"

# Stop all containers
echo "🛑 Stopping containers..."
docker-compose -f docker-compose.prod.yml down

# Clean up Docker
echo "🧹 Cleaning up Docker..."
docker system prune -f

# Rebuild and start
echo "🔨 Rebuilding and starting..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for startup
echo "⏳ Waiting for services to start..."
sleep 30

# Check health
echo "🏥 Checking health..."
docker-compose -f docker-compose.prod.yml ps

# Test basic connectivity
echo "🔍 Testing connectivity..."
curl -f http://localhost:5000/health || echo "❌ Backend health check failed"

# Test Redis
echo "🔍 Testing Redis..."
docker-compose -f docker-compose.prod.yml exec redis redis-cli ping || echo "❌ Redis not responding"

# Show recent logs
echo "📋 Recent backend logs..."
docker-compose -f docker-compose.prod.yml logs --tail=20 backend

echo "✅ Fix attempt complete!"
echo "🌐 Test your application at: http://35.154.211.147"
echo "🔧 If issues persist, run: ./debug-ec2.sh"
