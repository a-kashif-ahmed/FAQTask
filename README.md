FAQs Application (Node.js + React + MongoDB + Docker)

This project is a FAQs management system that allows users to:

Fetch FAQs from a database

Translate them into different languages

Add new FAQs

Display FAQs in a React frontend

Features

Backend: Node.js, Express.js, MongoDB

Frontend: React.js

Translation: Uses @vitalets/google-translate-api

Docker Support: Runs both frontend & backend in containers

Database: MongoDB (containerized)

Folder Structure

/faqsTask        # Backend (Node.js + Express)
  ├── models      # Mongoose schemas
  ├── routes      # Express routes
  ├── server.js   # Main server file
  ├── package.json
  ├── Dockerfile  # Backend Dockerfile
/frontend        # Frontend (React.js)
  ├── src         # React components
  ├── public      # Static assets
  ├── package.json
  ├── Dockerfile  # Frontend Dockerfile
/docker-compose.yml  # Docker Compose file to manage services

Prerequisites

Node.js (v18 or later)

MongoDB (or use Docker for MongoDB)

Docker (for containerization)

Installation & Setup

1. Backend Setup (Node.js + Express + MongoDB)

Install Dependencies

cd faqsTask
npm install

Run Backend

npm start

Backend will start at http://localhost:5000

2. Frontend Setup (React.js)

Install Dependencies

cd frontend
npm install

Run Frontend

npm start

Frontend will start at http://localhost:3000

3. MongoDB Setup

If you have MongoDB installed locally, run it.

If using Docker:

docker run -d -p 27017:27017 --name mongo-container mongo

Running with Docker

1. Backend Dockerfile (faqsTask/Dockerfile)

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]

2. Frontend Dockerfile (frontend/Dockerfile)

FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

3. Docker Compose (docker-compose.yml)

version: '3'
services:
  backend:
    build: ./faqsTask
    ports:
      - "5000:5000"
    depends_on:
      - mongo
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
  mongo:
    image: mongo
    ports:
      - "27017:27017"

4. Run Everything with Docker

docker-compose up --build

Now your app is running at:

Backend: http://localhost:5000

Frontend: http://localhost:3000

API Endpoints

1. Get FAQs (With Translation Support)

GET /api/faq?lang=<language_code>

Example:

curl http://localhost:5000/api/faq?lang=hi

2. Add a New FAQ

POST /api/addfaq

Example:

curl -X POST http://localhost:5000/api/addfaq \
 -H "Content-Type: application/json" \
 -d '{"question": "What is Docker?", "answer": "Docker is a containerization platform."}'

Troubleshooting

If data is not displaying in React frontend:

Ensure backend is running properly (npm start in faqsTask folder)

Open browser console (F12 > Console) and check for API errors

Ensure MongoDB is running

If using Docker, restart containers: docker-compose up --build

If translation is not working:

Ensure @vitalets/google-translate-api is installed in the backend

Check logs for API errors

Contributing

Fork the repository

Create a new branch

Commit changes and push

Submit a Pull Request

License

This project is open-source and available under the MIT License.

