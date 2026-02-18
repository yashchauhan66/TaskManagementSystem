# Signup 500 Error - Fix Guide

## Current Issue
```
POST http://35.154.211.147:5000/api/v1/signup 500 (Internal Server Error)
```

## Root Causes & Solutions

### 1. ✅ Error Handling Improved (FIXED)
- **Issue**: Raw error messages being returned
- **Fixed**: Proper error handling with logging
- **Result**: Better error messages and debugging

### 2. 🔍 Common Causes of 500 Errors

#### A. MongoDB Connection Issues
**Symptoms**: Database connection failures
**Test**: 
```bash
# On EC2:
docker-compose -f docker-compose.prod.yml exec backend node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yashchauhan6660_db_user:Hanuman123@cluster0.beu6lyv.mongodb.net/?appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));
"
```

#### B. Redis Connection Issues
**Symptoms**: Redis connection failures
**Test**:
```bash
docker-compose -f docker-compose.prod.yml exec redis redis-cli ping
```

#### C. Environment Variable Issues
**Symptoms**: Missing/incorrect env vars
**Test**:
```bash
docker-compose -f docker-compose.prod.yml exec backend node -e "
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SECRET_key:', process.env.SECRET_key);
console.log('REDIS_URL:', process.env.REDIS_URL);
"
```

#### D. User Model Issues
**Symptoms**: Database schema/validation errors
**Test**: Check UserModel.js for validation rules

## Quick Fix Steps

### Step 1: Run Debug Script
```bash
# On EC2:
chmod +x debug-ec2.sh
./debug-ec2.sh
```

### Step 2: Run Fix Script
```bash
chmod +x fix-ec2-issues.sh
./fix-ec2-issues.sh
```

### Step 3: Manual Test
```bash
# Test signup endpoint directly:
curl -v -X POST http://localhost:5000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'
```

## Environment Variables Check

### Backend (.env.production)
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

## Common Solutions

### Solution 1: Redeploy with Fixes
```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d
```

### Solution 2: Check Security Groups
Ensure EC2 Security Group allows:
- Port 80 (HTTP)
- Port 5000 (Backend - optional for testing)

### Solution 3: MongoDB Atlas Access
1. Check MongoDB Atlas whitelist
2. Ensure EC2 IP is added to Atlas access list
3. Verify database credentials

### Solution 4: Redis Issues
1. Redis container should be running
2. Check Redis logs: `docker-compose logs redis`
3. Redis should respond to ping

## Expected Results

### Successful Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id_here",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### Error Responses:
- **400**: Missing fields
- **409**: User already exists
- **500**: Server error (should be fixed now)

## Monitoring

### Check Logs:
```bash
# Backend logs:
docker-compose -f docker-compose.prod.yml logs -f backend

# Real-time errors:
docker-compose -f docker-compose.prod.yml logs backend | grep ERROR
```

### Health Checks:
```bash
# Backend health:
curl http://localhost:5000/health

# Container status:
docker-compose -f docker-compose.prod.yml ps
```

## Next Steps

1. ✅ Run debug script to identify specific issue
2. ✅ Apply appropriate fix based on debug output
3. ✅ Test signup functionality
4. ✅ Monitor logs for any remaining issues
5. 🔄 Test login and other endpoints

## Contact Support

If issues persist:
1. Run `./debug-ec2.sh` and share output
2. Check MongoDB Atlas dashboard
3. Verify EC2 instance logs
4. Check Docker container resource usage
