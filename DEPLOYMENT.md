# Production Deployment Guide

## Environment Configuration

### Frontend Environment Variables (Create React App)
- **Development**: `.env.development` → `REACT_APP_API_URL=http://localhost:5000`
- **Production**: `.env.production` → `REACT_APP_API_URL=http://13.49.245.39:5000`

### Backend Environment Variables
- **Production**: `backend/.env`
  ```
  MONGO_URL=mongodb://localhost:27017/taskmanagement
  SECRET_KEY=your_jwt_secret_key_here
  NODE_ENV=production
  PORT=5000
  ```

## API Configuration

### Frontend API Service
```javascript
// src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL;
```

### Environment Variable Usage
- **Development**: Uses `http://localhost:5000`
- **Production**: Uses `http://13.49.245.39:5000`
- **Tests**: Mocked to `http://localhost:5000` in setupTests.js

## Docker Configuration

### Production Deployment
```bash
# Using production docker-compose
docker-compose -f docker-compose.prod.yml up --build -d

# Or use the deployment script
chmod +x deploy.sh
./deploy.sh
```

### Service URLs
- **Frontend**: http://13.49.245.39
- **Backend API**: http://13.49.245.39:5000
- **Health Check**: http://13.49.245.39/health

## Testing

### Jest Tests
```bash
# Run tests with environment variables
npm test -- --watchAll=false

# Tests automatically use mocked environment variables
# process.env.REACT_APP_API_URL = 'http://localhost:5000';
```

### Environment Variable Testing
```bash
# Test environment configuration
node test-env.js
```

## Docker Features

### Security
- Non-root user for backend
- Security headers in nginx
- Environment variable isolation

### Performance
- Gzip compression
- Static asset caching
- Multi-stage builds

### Reliability
- Health checks
- Automatic restarts
- Service dependencies

## Development vs Production

### Development
```bash
# Frontend uses .env.development
npm start  # Runs on localhost:3000
API calls to http://localhost:5000
```

### Production
```bash
# Frontend built with .env.production
Docker build uses production environment
API calls to http://13.49.245.39:5000
```

## Environment Variables

### Frontend (Create React App)
- `REACT_APP_API_URL`: Backend API URL
- Automatically loaded based on NODE_ENV
- Must start with `REACT_APP_` prefix

### Backend
- `MONGO_URL`: MongoDB connection string
- `SECRET_KEY`: JWT signing key
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port

## Monitoring

### Check Service Status
```bash
docker-compose -f docker-compose.prod.yml ps
```

### View Logs
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Health Check
```bash
curl http://13.49.245.39/health
```

## SSL/HTTPS Setup

For production with SSL:
1. Update nginx.conf to include SSL configuration
2. Mount SSL certificates
3. Update docker-compose.prod.yml to expose port 443

## Scaling

To scale the application:
1. Use Docker Swarm or Kubernetes
2. Add load balancer configuration
3. Implement session storage (Redis)
