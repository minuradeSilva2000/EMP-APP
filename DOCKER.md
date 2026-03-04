# Docker Setup for Employee Management System

This directory contains Docker configuration files for containerizing the Employee Management System.

## Files Overview

### 🐳 Docker Configuration Files

- **`Dockerfile`** - Backend container configuration
- **`ts-dashboard/Dockerfile`** - Frontend container configuration  
- **`docker-compose.yml`** - Multi-container orchestration
- **`.dockerignore`** - Files to exclude from Docker build
- **`.env.production`** - Production environment variables

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git (for cloning the repository)

### Running with Docker Compose

1. **Build and start all services:**
   ```bash
   npm run docker:build
   npm run docker:up
   ```

2. **View logs:**
   ```bash
   npm run docker:logs
   ```

3. **Stop services:**
   ```bash
   npm run docker:down
   ```

4. **Clean up everything:**
   ```bash
   npm run docker:clean
   ```

## 🌐 Access Points

Once running, access the application at:

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Direct Backend**: http://localhost:5000

## 🏗️ Architecture

### Backend Container
- **Base Image**: Node.js 18 Alpine
- **Port**: 5000
- **Environment**: Production
- **Health Check**: `/api/employees` endpoint

### Frontend Container  
- **Base Image**: Nginx Alpine
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Build**: Multi-stage (build + production)
- **Features**:
  - Gzip compression
  - Static asset caching
  - Security headers
  - API proxy to backend
  - Client-side routing support

### Network
- **Network**: Custom bridge network (`employee-network`)
- **Communication**: Containers can communicate via service names

## 🔧 Environment Variables

Create a `.env` file with your production values:

```bash
# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret (required)
JWT_SECRET=your-super-secret-jwt-key

# Redirect URI (for OAuth)
REDIRECT_URI=http://localhost/oauth
```

## 📝️ Development vs Production

### Development
```bash
npm run dev
```
- Uses local Node.js and Vite dev servers
- Hot reload enabled
- Source maps available

### Production
```bash
npm run docker:up
```
- Uses Docker containers
- Optimized builds
- Production-ready configuration

## 🔍 Troubleshooting

### Port Conflicts
If ports are in use, modify `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change host port
  backend:
    ports:
      - "5001:5000"  # Change host port
```

### Build Issues
```bash
# Rebuild without cache
npm run docker:clean
npm run docker:build
```

### Permission Issues
```bash
# Fix Docker permissions (Linux/Mac)
sudo chown -R $USER:$USER .
```

## 🔒 Security Features

- **Nginx Security Headers**: XSS, CSRF, content type protection
- **CORS Configuration**: Proper cross-origin handling
- **Health Checks**: Container monitoring and auto-restart
- **Non-root User**: Security best practice
- **Environment Variables**: Sensitive data not in images

## 📊 Monitoring

### Health Checks
- Backend: `curl -f http://localhost:5000/api/employees`
- Frontend: `curl -f http://localhost`

### Logs
```bash
# Real-time logs
npm run docker:logs

# Specific service logs
docker-compose logs backend
docker-compose logs frontend
```

## 🚀 Deployment Notes

### Production Considerations
1. **Change default passwords** in `.env.production`
2. **Use HTTPS** in production (add SSL certificates)
3. **Set up reverse proxy** (Traefik, Nginx, etc.)
4. **Enable volume mounts** for persistent data
5. **Configure backup strategy**

### Scaling
```yaml
# Example scaling configuration
services:
  frontend:
    deploy:
      replicas: 3
  backend:
    deploy:
      replicas: 2
```

## 🐛 Docker Commands Reference

```bash
# Build images
docker-compose build

# Start services (detached)
docker-compose up -d

# Start services (foreground)
docker-compose up

# Stop services
docker-compose down

# View running containers
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Execute commands in container
docker-compose exec backend sh
docker-compose exec frontend sh

# Clean up
docker-compose down -v --rmi all
```
