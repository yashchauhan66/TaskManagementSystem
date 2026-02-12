FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy environment files
COPY .env.production .env.production

# Copy source code
COPY . .

# Build the application with production environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=http://13.49.245.39:5000
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]