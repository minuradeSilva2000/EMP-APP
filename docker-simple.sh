# Simple Docker deployment without Docker Compose

# Build and run backend
docker build -t employee-backend .
docker run -d --name employee-api -p 5000:5000 --env-file .env.production employee-backend

# Build and run frontend
cd ts-dashboard
docker build -t employee-frontend .
docker run -d --name employee-web -p 80:80 --link employee-api:api employee-frontend

# View logs
docker logs employee-api
docker logs employee-web

# Stop containers
docker stop employee-api employee-web

# Remove containers
docker rm employee-api employee-web

# Clean up images
docker rmi employee-backend employee-frontend
