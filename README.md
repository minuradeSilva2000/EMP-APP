# Employee Management System

A full-stack employee management application with React frontend and Node.js backend.

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Build and start all services
npm run docker:build
npm run docker:up

# Access at http://localhost
```

### Option 2: Local Development
```bash
# Start both servers automatically
npm run dev

# Or start manually
npm start                    # Backend
cd ts-dashboard && npm run dev  # Frontend
```

### Option 3: Windows Batch File
Double-click `start-project.bat` to launch both servers in separate windows.

## 🌐 Access Points

- **Frontend Dashboard**: http://localhost (Docker) or http://localhost:5173 (Local)
- **Backend API**: http://localhost/api (Docker) or http://localhost:5000 (Local)
- **API Documentation**: http://localhost/api/employees

## 🐳 Docker Setup

The application includes complete Docker configuration for containerized deployment:

### Docker Files
- `Dockerfile` - Backend container
- `ts-dashboard/Dockerfile` - Frontend container  
- `docker-compose.yml` - Multi-container orchestration
- `.env.production` - Production environment

### Docker Commands
```bash
npm run docker:build    # Build images
npm run docker:up       # Start services
npm run docker:down     # Stop services
npm run docker:logs     # View logs
npm run docker:clean    # Clean up everything
```

See [DOCKER.md](./DOCKER.md) for detailed Docker documentation.

## Features

- Employee CRUD operations
- JWT authentication with Google OAuth
- Real-time dashboard with statistics
- Modern React UI with Tailwind CSS
- TypeScript for type safety
- Docker containerization

## Default Login

- Email: admin@example.com
- Password: password123

## Project Structure

```
├── server.js              # Backend server
├── package.json           # Backend dependencies
├── ts-dashboard/          # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript definitions
│   └── package.json       # Frontend dependencies
├── Dockerfile             # Backend container
├── docker-compose.yml      # Container orchestration
├── .env.production       # Production environment
└── start-project.bat      # Windows startup script
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker Desktop (for containerized development)

### Local Development
```bash
# Install dependencies
npm install
cd ts-dashboard && npm install

# Start development servers
npm run dev
```

### Environment Variables
Create `.env` file:
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/google` - Google OAuth initiation

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Production Deployment

### Docker Production
```bash
# Use production environment
cp .env.production .env

# Build and deploy
docker-compose -f docker-compose.yml up -d
```

### Security Notes
- Change default JWT secret in production
- Use HTTPS in production environments
- Configure proper CORS origins
- Enable rate limiting for API endpoints

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml
2. **CORS errors**: Check allowed origins in backend
3. **Authentication failures**: Verify JWT secret configuration
4. **Docker build fails**: Check .dockerignore file

### Health Checks
```bash
# Backend health
curl http://localhost:5000/api/employees

# Frontend health
curl http://localhost
```
