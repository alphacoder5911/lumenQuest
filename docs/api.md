# LumenQuest API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "phone": "+1234567890",
  "role": "USER" // "ADMIN"
}
```

**Request Body Parameters:**
- `name` (string, required): User's full name (min 2 characters)
- `email` (string, required): Valid email address
- `password` (string, required): Password (min 8 characters)
- `phone` (string, optional): Phone number in international format
- `role` (string, optional): User role - "USER" or "ADMIN" (defaults to "USER")

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "USER",
      "status": "active",
      "createdAt": "2025-09-13T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validation failed
- `409` - User already exists
- `500` - Internal server error

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive access token

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Request Body Parameters:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "USER",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validation failed
- `401` - Invalid credentials
- `403` - Account inactive
- `500` - Internal server error

---

### 3. Logout User

**Endpoint:** `POST /api/auth/logout`

**Description:** Logout user (client-side token invalidation)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses:**
- `401` - Token required or invalid
- `500` - Internal server error

---

### 4. Verify Token

**Endpoint:** `GET /api/auth/verify`

**Description:** Verify if current token is valid and get user info

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "USER",
      "status": "active"
    }
  }
}
```

**Error Responses:**
- `401` - Token expired, invalid, or user not found
- `500` - Internal server error

---