# The Data Hub — RESTful API Server

Sprint 09 | Track B: Fullstack Developers

A simple Express.js REST API for a mock "Blog" resource, with in-memory
storage, request logging middleware, and mock JWT authentication.

## Tech Stack
- Node.js
- Express.js
- jsonwebtoken (for mock login tokens)

## Setup

```bash
npm install
node server.js
```

Server runs at: **http://localhost:5000**

## Endpoints

| Method | Route              | Description                     |
|--------|---------------------|----------------------------------|
| GET    | `/`                 | Health check                    |
| GET    | `/api/blogs`        | Get all blogs                   |
| GET    | `/api/blogs/:id`    | Get a single blog by id         |
| POST   | `/api/blogs`        | Create a new blog               |
| PUT    | `/api/blogs/:id`    | Update an existing blog         |
| DELETE | `/api/blogs/:id`    | Delete a blog                   |
| POST   | `/api/login`        | Mock login — returns a JWT      |

## Example Requests (curl)

**Create a blog**
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello world","author":"Aman"}'
```

**Get all blogs**
```bash
curl http://localhost:5000/api/blogs
```

**Update a blog**
```bash
curl -X PUT http://localhost:5000/api/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

**Delete a blog**
```bash
curl -X DELETE http://localhost:5000/api/blogs/1
```

**Login (mock JWT)**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"aman","password":"1234"}'
```

## Testing with Postman / Thunder Client
1. Import the base URL `http://localhost:5000`
2. Create a collection with the 6 requests above
3. Test each CRUD operation in sequence: POST → GET → PUT → GET → DELETE → GET
4. Check the terminal — every request should print a log line like:
   `[timestamp] POST /api/blogs`

## Notes
- Data is stored **in memory** (a JS array) — it resets every time the
  server restarts. This is expected for this sprint (no database yet).
- The JWT login is a **mock**: it does not check credentials against a
  real user database — any non-empty username/password returns a token.
- Deploy this on **Render** or **Railway** (Vercel/Netlify are built for
  static/serverless frontends, not always-on Express servers — mention
  this in your submission if asked).
