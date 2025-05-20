# Serverless Auth API

A simple authentication API using serverless functions (Vercel/Netlify) and Neon Postgres.

## Setup

1. **Clone the repo**
2. **Install dependencies**
   ```
   npm install
   ```
3. **Create a Neon account and get your DATABASE_URL**
   - Go to [neon.tech](https://neon.tech/)
   - Create a project, copy the connection string.
4. **Generate a JWT secret**
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
5. **Create a `.env` file**
   ```
   DATABASE_URL=your_neon_postgres_url
   JWT_SECRET=your_jwt_secret
   ```
6. **Deploy to Vercel**
   - Push to GitHub
   - Import to Vercel
   - Set environment variables in Vercel dashboard

## API Endpoints

### POST `/api/register`
- Body: `{ "username": "string", "password": "string" }`
- Response: `{ "message": "User registered", "user": { "id": ..., "username": ... } }`

### POST `/api/login`
- Body: `{ "username": "string", "password": "string" }`
- Response: `{ "message": "Login successful", "token": "..." }`

## Testing

Use Postman or curl to test the endpoints.
