# EC2 Deployment Troubleshooting Guide

## Current Issues & Solutions

### ❌ 500 Internal Server Errors

**Problem**: Frontend getting 500 errors from `http://35.154.211.147:5000`

**Root Causes & Solutions**:

#### 1. ✅ API URL Typo (FIXED)
- **Issue**: `http://35.154.211.147.:5000` (extra dot)
- **Fixed**: `http://35.154.211.147:5000`

#### 2. ✅ Redis Connection Issues (FIXED)
- **Issue**: Backend trying to connect to Redis but failing
- **Solution**: Redis container included in docker-compose.prod.yml

#### 3. 🔍 Check Backend Health
```bash
# On EC2 instance:
curl http://localhost:5000/health
# Should return: OK

# Check container logs:
docker-compose -f docker-compose.prod.yml logs backend
```

#### 4. 🔍 Check MongoDB Connection
```bash
# Verify MongoDB URI is accessible
# Check backend logs for MongoDB connection errors
```

## Quick Fix Steps

### Step 1: Deploy with Updated Configuration
```bash
# On EC2 instance:
cd TaskManagementSystem
chmod +x deploy-ec2.sh
./deploy-ec2.sh
```

### Step 2: Verify Services
```bash
# Check all containers are running:
docker-compose -f docker-compose.prod.yml ps

# Check backend health:
curl http://localhost:5000/health

# Check frontend:
curl http://localhost:80
```

### Step 3: Check Logs
```bash
# Backend logs:
docker-compose -f docker-compose.prod.yml logs backend

# Redis logs:
docker-compose -f docker-compose.prod.yml logs redis

# Frontend logs:
docker-compose -f docker-compose.prod.yml logs frontend
```

## Common Issues & Solutions

### Issue: Redis Connection Failed
**Solution**: Redis container is now included in docker-compose

### Issue: MongoDB Connection Failed
**Solution**: 
1. Verify MongoDB Atlas credentials
2. Check network access from EC2
3. Update MONGO_URI in .env.production

### Issue: Frontend Not Loading
**Solution**:
1. Check nginx configuration
2. Verify API URL in .env.production
3. Check port 80 is open

### Issue: CORS Errors
**Solution**: Backend CORS is configured, but verify:
```javascript
app.use(cors());
```

## Environment Variables

### Production (.env.production)
```env
MONGO_URI=mongodb+srv://yashchauhan6660_db_user:Hanuman123@cluster0.beu6lyv.mongodb.net/?appName=Cluster0
SECRET_key=Hanuman@12345
NODE_ENV=production
REDIS_URL=redis://redis:6379
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=http://35.154.211.147:5000
```

## Security Groups & Ports

Ensure these ports are open in EC2 Security Group:
- **Port 80**: HTTP (Frontend)
- **Port 443**: HTTPS (Future SSL)
- **Port 5000**: Backend API (Optional - for direct access)

## Monitoring Commands

```bash
# Real-time logs:
docker-compose -f docker-compose.prod.yml logs -f

# Resource usage:
docker stats

# Container status:
docker-compose -f docker-compose.prod.yml ps
```

## Next Steps

1. ✅ Deploy with updated configuration
2. ✅ Verify all services are healthy
3. ✅ Test API endpoints
4. ✅ Test frontend functionality
5. 🔄 Set up SSL/HTTPS (optional)
6. 🔄 Set up domain name (optional)
