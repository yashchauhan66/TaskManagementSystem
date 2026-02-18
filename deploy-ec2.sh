#!/bin/bash

echo "🚀 Deploying Task Management System to EC2"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo "🏥 Checking service health..."
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo "📋 Showing service logs..."
docker-compose -f docker-compose.prod.yml logs --tail=20

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://35.154.211.147"
echo "🔧 Backend: http://35.154.211.147:5000"
echo "🔍 Health Check: http://35.154.211.147:5000/health"
