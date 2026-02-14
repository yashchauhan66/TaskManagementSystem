#!/bin/bash

echo " Testing deployment setup..."

# Test if environment files exist
echo " Checking environment files..."
if [ -f "frontend/.env.development" ]; then
    echo " .env.development exists"
else
    echo " .env.development missing"
fi

if [ -f "frontend/.env.production" ]; then
    echo " .env.production exists"
else
    echo " .env.production missing"
fi

if [ -f "backend/.env" ]; then
    echo " backend/.env exists"
else
    echo " backend/.env missing"
fi

# Test Docker files
echo " Checking Docker configuration..."
if [ -f "frontend/Dockerfile" ]; then
    echo " Frontend Dockerfile exists"
else
    echo " Frontend Dockerfile missing"
fi

if [ -f "backend/Dockerfile" ]; then
    echo " Backend Dockerfile exists"
else
    echo " Backend Dockerfile missing"
fi

if [ -f "docker-compose.prod.yml" ]; then
    echo " Production docker-compose exists"
else
    echo " Production docker-compose missing"
fi

# Test nginx configuration
if [ -f "frontend/nginx.conf" ]; then
    echo " Nginx configuration exists"
else
    echo " Nginx configuration missing"
fi

# Test health check
if [ -f "backend/healthcheck.js" ]; then
    echo " Health check script exists"
else
    echo " Health check script missing"
fi

echo " Environment variable contents:"
echo "Development: $(cat frontend/.env.development)"
echo "Production: $(cat frontend/.env.production)"
echo "Backend: $(cat backend/.env)"

echo " Test complete!"
