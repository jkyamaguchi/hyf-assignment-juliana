# Authentication API Documentation

## Overview

This API supports two auth token flows:

- JWT token flow via /api/auth/login
- Opaque token flow via /api/auth/login-token

Opaque tokens are persisted in the tokens table.

Available auth endpoints:

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/login-token
- POST /api/auth/logout-token

Protected write endpoints (JWT required):

- POST /api/snippets
- PUT /api/snippets/:id
- DELETE /api/snippets/:id

Base URL:

- http://localhost:3000

Required request header for JSON bodies:

- Content-Type: application/json

Required request header for protected routes:

- Authorization: Bearer <token>

## Users Table Schema

Current implementation expects:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  confirmed_at DATETIME DEFAULT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT
);
```

Note:

- The token column in users was deleted because token persistence now uses the tokens table.

## Tokens Table Schema

Current implementation expects:

```sql
CREATE TABLE tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_at NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  expires_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## JWT and Middleware Flow

1. Register and login both generate a JWT signed with JWT_SECRET.
2. Login-token creates a random opaque token and stores it in tokens.
3. Middleware validates:
   - Authorization header format
   - JWT signature and expiration
4. If valid, authenticated user is attached to req.user.

Important:

- The protected snippet write endpoints use the JWT middleware.
- Use the token returned by POST /api/auth/register or POST /api/auth/login.
- Do not use the token returned by POST /api/auth/login-token for the protected snippet routes.

## Endpoint: Register

URL:

- POST /api/auth/register

Request body:

```json
{
  "first_name": "Juliana",
  "last_name": "Silva",
  "email": "juliana@example.com",
  "password": "secret123"
}
```

Validation rules:

- first_name: required, non-empty string
- last_name: required, non-empty string
- email: required, valid email format
- password: required, non-empty string

Success response (201):

```json
{
  "msg": "User created",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "juliana@example.com",
    "first_name": "Juliana",
    "last_name": "Silva"
  }
}
```

Possible errors:

- 400 Invalid request body
- 409 User already exists
- 500 An unexpected server error occurred

## Endpoint: Login

URL:

- POST /api/auth/login

Request body:

```json
{
  "email": "juliana@example.com",
  "password": "secret123"
}
```

Success response (200):

```json
{
  "msg": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "juliana@example.com",
    "first_name": "Juliana",
    "last_name": "Silva"
  }
}
```

Possible errors:

- 400 Invalid request body
- 401 Wrong email or password
- 500 An unexpected server error occurred

## Endpoint: Login Token

URL:

- POST /api/auth/login-token

Request body:

```json
{
  "email": "juliana@example.com",
  "password": "secret123"
}
```

Success response (200):

```json
{
  "token": "<random_token>"
}
```

Token expiration and timestamps:

- created_at is filled by the database automatically with DEFAULT (CURRENT_TIMESTAMP) at insert time.
- expires_at is set to 1 hour from the current time when the token is generated.
- Tokens expire after 1 hour; the client or middleware should check expires_at to validate token freshness.

Possible errors:

- 400 Invalid request body
- 401 Wrong email or password
- 500 An unexpected server error occurred

## Endpoint: Logout Token

URL:

- POST /api/auth/logout-token

Required header:

- Authorization: Bearer <token>

Or pass the token in the request body:

```json
{
  "token": "<random_token>"
}
```

Success response (200):

```json
{
  "msg": "Logged out successfully"
}
```

Behavior:

- Deletes the matching token record from the tokens table.
- After logout the token can no longer be used.

Possible errors:

- 400 Token is required
- 404 Token not found
- 500 An unexpected server error occurred

### Important: Login-Token Cannot Access Snippets

**The opaque token from `/login-token` cannot be used to access protected snippet endpoints.**

Why:

- The `/api/snippets` endpoints use JWT authentication via `authenticateJwt` middleware.
- This middleware verifies tokens using cryptographic JWT validation (`jwt.verify()`).
- Opaque tokens from `/login-token` are random hex strings and will fail JWT verification.

Usage:

- **For snippet access:** Use the JWT token from POST /api/auth/register or POST /api/auth/login.
- **For opaque tokens:** Use `/login-token` if you need server-side token revocation and session tracking (future feature).

## Accessing Protected Snippet Endpoints Step by Step

The protected snippet endpoints are:

- POST /api/snippets
- PUT /api/snippets/:id
- DELETE /api/snippets/:id

These endpoints require a JWT in this format:

- Authorization: Bearer <jwt_token>

Use the JWT returned by register or login.

## Postman: Step by Step

### 1) Register a user and get a JWT

1. Create a request: POST http://localhost:3000/api/auth/register
2. Add header: Content-Type = application/json
3. Add this raw JSON body:

```json
{
  "first_name": "Juliana",
  "last_name": "Silva",
  "email": "juliana@example.com",
  "password": "secret123"
}
```

4. Send the request.
5. Copy the value from the response field token.

Expected success response example:

```json
{
  "msg": "User created",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "juliana@example.com",
    "first_name": "Juliana",
    "last_name": "Silva"
  }
}
```

### 2) Or login and get a JWT

If the user already exists, use login instead of register.

1. Create a request: POST http://localhost:3000/api/auth/login
2. Add header: Content-Type = application/json
3. Add this raw JSON body:

```json
{
  "email": "juliana@example.com",
  "password": "secret123"
}
```

4. Send the request.
5. Copy the value from the response field token.

Expected success response example:

```json
{
  "msg": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "juliana@example.com",
    "first_name": "Juliana",
    "last_name": "Silva"
  }
}
```

### 3) Create a snippet with JWT authentication

1. Create a request: POST http://localhost:3000/api/snippets
2. Add headers:
   - Content-Type = application/json
   - Authorization = Bearer <paste_jwt_here>
3. Add this raw JSON body:

```json
{
  "title": "My First Snippet",
  "contents": "console.log('hello');",
  "is_private": false
}
```

4. Send the request.
5. Copy the id from the created snippet response.

Expected success response example:

```json
{
  "id": 1,
  "user_id": "1",
  "title": "My First Snippet",
  "contents": "console.log('hello');",
  "is_private": false
}
```

### 4) Update your snippet with JWT authentication

1. Create a request: PUT http://localhost:3000/api/snippets/1
2. Replace 1 with the real snippet id.
3. Add headers:
   - Content-Type = application/json
   - Authorization = Bearer <paste_jwt_here>
4. Add this raw JSON body:

```json
{
  "title": "Updated title"
}
```

5. Send the request.

Expected success response example:

```json
{
  "id": 1,
  "user_id": "1",
  "title": "Updated title",
  "contents": "console.log('hello');",
  "is_private": false
}
```

### 5) Delete your snippet with JWT authentication

1. Create a request: DELETE http://localhost:3000/api/snippets/1
2. Replace 1 with the real snippet id.
3. Add header:
   - Authorization = Bearer <paste_jwt_here>
4. Send the request.

Expected success response example:

```json
{
  "message": "Snippet deleted"
}
```

### 6) Ready-to-use Postman raw HTTP examples

Register:

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "first_name": "Juliana",
  "last_name": "Silva",
  "email": "juliana@example.com",
  "password": "secret123"
}
```

Login:

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "juliana@example.com",
  "password": "secret123"
}
```

Create snippet:

```http
POST http://localhost:3000/api/snippets
Content-Type: application/json
Authorization: Bearer <jwt>

{
  "title": "My First Snippet",
  "contents": "console.log('hello');",
  "is_private": false
}
```

Update snippet:

```http
PUT http://localhost:3000/api/snippets/1
Content-Type: application/json
Authorization: Bearer <jwt>

{
  "title": "Updated title"
}
```

Delete snippet:

```http
DELETE http://localhost:3000/api/snippets/1
Authorization: Bearer <jwt>
```

Logout token:

```http
POST http://localhost:3000/api/auth/logout-token
Authorization: Bearer <opaque_token>
```

## Swagger UI: Step by Step

Swagger UI is available at:

- http://localhost:3000/docs

### 1) Get a JWT first

1. Open http://localhost:3000/docs
2. Expand POST /api/auth/register or POST /api/auth/login.
3. Click Try it out.
4. Enter the request body.
5. Click Execute.
6. Copy the token value from the response body.

### 2) Authorize Swagger with your JWT

1. Click the Authorize button at the top of Swagger UI.
2. In the BearerAuth field, paste:

```text
Bearer <your_jwt_token>
```

3. Click Authorize.
4. Close the dialog.

### 3) Call protected snippet endpoints in Swagger

Create snippet:

1. Expand POST /api/snippets.
2. Click Try it out.
3. Enter this request body:

```json
{
  "title": "My First Snippet",
  "contents": "console.log('hello');",
  "is_private": false
}
```

4. Click Execute.

Update snippet:

1. Expand PUT /api/snippets/{id}.
2. Click Try it out.
3. Enter the snippet id in the id field.
4. Enter this request body:

```json
{
  "title": "Updated title"
}
```

5. Click Execute.

Delete snippet:

1. Expand DELETE /api/snippets/{id}.
2. Click Try it out.
3. Enter the snippet id in the id field.
4. Click Execute.

## Notes

- user_id is set from the authenticated token user, not from the request body.
- Update and delete only work for the owner of the snippet.
- If the authenticated user is not the owner, the API returns 403 Forbidden.
- The token returned by POST /api/auth/login-token is an opaque token and should not be used for the protected snippet write endpoints.

## Common Error Responses

Invalid request body (400):

```json
{
  "error": "Invalid request body",
  "details": [
    {
      "path": "first_name",
      "message": "first_name is required"
    }
  ]
}
```

Missing or invalid auth header (401):

```json
{
  "error": "Missing or invalid Authorization header. Use Bearer <token>"
}
```

Invalid token (401):

```json
{
  "error": "Invalid token"
}
```

Forbidden (403):

```json
{
  "error": "Forbidden: you can only modify your own snippets"
}
```

## Setup Notes

Install dependencies:

```bash
npm install bcrypt jsonwebtoken zod dotenv
```

Set environment values in .env:

```env
JWT_SECRET=your-long-random-secret
PORT=3000
```

Start server:

```bash
npm run dev
```

## Code Reference

- Auth routes: [api/src/routers/auth.js](api/src/routers/auth.js)
- JWT middleware: [api/src/middleware/authenticateJwt.js](api/src/middleware/authenticateJwt.js)
- Protected snippets routes: [api/src/routers/snippets.js](api/src/routers/snippets.js)
