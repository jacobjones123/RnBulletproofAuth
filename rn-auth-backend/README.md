# rn-auth-backend

A tiny TypeScript Express API for React Native sign-in. Ships with Docker and docker-compose.

## Endpoints

- POST `/auth/login`
  - Body: `{ "email": "any", "password": "password123" }`
  - 200 -> `{ token, user }`
  - 400/401 on validation or invalid credentials

## Local dev

npm i
npm run dev

## Docker (production build)

docker build -t rn-auth-backend .
docker run --name rn-auth-backend -p 4000:4000 --env-file .env rn-auth-backend

## Docker Compose

docker compose up --build

Environment:
- Server listens on 0.0.0.0 for Docker compatibility
- iOS Simulator -> http://localhost:4000
- Android Emulator -> http://10.0.2.2:4000
