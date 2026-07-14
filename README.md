# The Data Hub — RESTful API Server

Sprint 09 | Track B: Fullstack Developers

A simple Express.js REST API for a mock "Blog" resource, with in-memory
storage, request logging middleware, and mock JWT authentication.

## Tech Stack
- Node.js
- Express.js
- jsonwebtoken (for mock login tokens)

## Setup

```bash# The Data Hub 🗂️

Sprint 09 | Track B: Fullstack Developers

A simple REST API built with Express for managing blog posts — has full CRUD (Create, Read, Update, Delete), a mock login system that returns a JWT, and a request logger middleware. Data is stored in memory for now (no database yet), so it resets every time you restart the server.

I also built a small API console UI (`public/index.html`) so you can test the endpoints straight from the browser without needing Postman.

---

## 🔗 Live Demo

> Add your deployed link here once it's live, e.g:
> **https://data-hub-akarshi.onrender.com**

---

## Tech Stack

- Node.js + Express
- jsonwebtoken (for the mock login)
- Vanilla HTML/CSS/JS for the API console UI

## Getting Started

```bash
npm install
npm start
```

Server will start at `http://localhost:5000`

## API Endpoints

| Method | Route             | What it does           |
|--------|-------------------|-------------------------|
| GET    | `/api/health`     | Check if server is up  |
| GET    | `/api/blogs`      | Get all blogs          |
| GET    | `/api/blogs/:id`  | Get one blog by id     |
| POST   | `/api/blogs`      | Create a new blog      |
| PUT    | `/api/blogs/:id`  | Update a blog          |
| DELETE | `/api/blogs/:id`  | Delete a blog          |
| POST   | `/api/login`      | Mock login → returns JWT |

## Trying it out with curl

**Create a blog:**
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello world","author":"Aman"}'
```

**Get all blogs:**
```bash
curl http://localhost:5000/api/blogs
```

**Update a blog:**
```bash
curl -X PUT http://localhost:5000/api/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

**Delete a blog:**
```bash
curl -X DELETE http://localhost:5000/api/blogs/1
```

**Login (mock JWT):**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"aman","password":"1234"}'
```

## Testing it yourself

Easiest way is to just open `http://localhost:5000` in the browser — the API console UI lets you pick an endpoint, fill in the fields, and hit send.

If you'd rather use Postman or Thunder Client:
1. Point it at `http://localhost:5000`
2. Try the requests in this order: POST → GET → PUT → GET → DELETE → GET
3. Watch the terminal — every request logs a line like `[timestamp] POST /api/blogs`

## A few things to keep in mind

- **No real database** — blogs live in a JS array in memory, so a server restart wipes everything. That's expected for this sprint.
- **Login is a mock** — it doesn't check against a real user table. Any non-empty username + password returns a valid-looking JWT.
- **Deployment** — Express apps like this run best on Render or Railway (always-on servers). Vercel works too but is more built for serverless/static, so cold starts and file-persistence behave a bit differently there.

---

### Developed by Akarshi Agrahari
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
