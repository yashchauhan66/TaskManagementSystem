#!/bin/bash

echo "🔍 EC2 Backend Debug Script"

echo "1. Checking container status..."
docker-compose -f docker-compose.prod.yml ps

echo -e "\n2. Checking backend logs (last 50 lines)..."
docker-compose -f docker-compose.prod.yml logs --tail=50 backend

echo -e "\n3. Checking Redis logs..."
docker-compose -f docker-compose.prod.yml logs --tail=20 redis

echo -e "\n4. Testing backend health..."
curl -v http://localhost:5000/health

echo -e "\n5. Testing signup endpoint directly..."
curl -v -X POST http://localhost:5000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'

echo -e "\n6. Checking MongoDB connection..."
docker-compose -f docker-compose.prod.yml exec backend node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yashchauhan6660_db_user:Hanuman123@cluster0.beu6lyv.mongodb.net/?appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));
"

echo -e "\n7. Checking Redis connection..."
docker-compose -f docker-compose.prod.yml exec redis redis-cli ping

echo -e "\n✅ Debug complete!"
