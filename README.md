# Auth API Documentation

**Base URL:** `https://auth-nidracare.vercel.app`

---

## POST `/api/register`

**Register a new user**

### Request Body (JSON):
```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

### Success Response:
```json
{
  "message": "User registered",
  "user": {
    "id": 1,
    "username": "yourusername"
  }
}
```

### Error Responses:
```json
{
  "error": "Username already exists"
}
```

---

## POST `/api/login`

**Login and get a JWT token**

### Request Body (JSON):
```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

### Success Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Error Responses:
```json
{
  "error": "Invalid username or password"
}
```

---

## How to Test

Use [Postman](https://www.postman.com/) or `curl`:

### Register endpoint:
```bash
curl -X POST https://auth-nidracare.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### Login endpoint:
```bash
curl -X POST https://auth-nidracare.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

For more endpoints or questions, contact the API maintainer.