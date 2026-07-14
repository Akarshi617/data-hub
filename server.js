// ========================================
// THE DATA HUB — RESTful API Server
// Sprint 09 | Track B: Fullstack Developers
// ========================================

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5001;
const JWT_SECRET = "sprint09-secret-key"; // demo only, never hardcode in real apps

// Parse incoming JSON bodies (needed for POST/PUT)
app.use(express.json());

// ----------------------------------------
// PHASE 3: Middleware Engineering
// Logs the HTTP method + URL of every request
// ----------------------------------------
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // pass control to the next handler
});

// ----------------------------------------
// PHASE 2: In-memory "database"
// ----------------------------------------
let blogs = []; // empty array acting as our mock DB
let nextId = 1; // simple auto-increment id

// ----------------------------------------
// PHASE 1 + 2: Blog CRUD Endpoints
// ----------------------------------------

// Root route — sanity check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Data Hub API. Server is running." });
});

// GET all blogs
app.get("/api/blogs", (req, res) => {
  res.json({ success: true, count: blogs.length, data: blogs });
});

// GET single blog by id
app.get("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }
  res.json({ success: true, data: blog });
});

// POST — create a new blog (push to array)
app.post("/api/blogs", (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const newBlog = {
    id: nextId++,
    title,
    content,
    author: author || "Anonymous",
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  res.status(201).json({ success: true, data: newBlog });
});

// PUT — update an existing blog
app.put("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  const { title, content, author } = req.body;
  if (title) blog.title = title;
  if (content) blog.content = content;
  if (author) blog.author = author;
  blog.updatedAt = new Date().toISOString();

  res.json({ success: true, data: blog });
});

// DELETE — remove a blog (filter from array)
app.delete("/api/blogs/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const exists = blogs.some((b) => b.id === idToDelete);

  if (!exists) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  blogs = blogs.filter((b) => b.id !== idToDelete);
  res.json({ success: true, message: `Blog ${idToDelete} deleted` });
});

// ----------------------------------------
// PHASE 3: Auth Scaffolding — Mock Login
// ----------------------------------------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  // NOTE: This is a MOCK login — no real user database or password check.
  // In a real app you would verify credentials against a hashed password in a DB.
  const token = jwt.sign(
    { username, role: "user" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    message: "Login successful (mock)",
    token,
  });
});

// ----------------------------------------
// Start Server
// ----------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 The Data Hub API is running on http://localhost:${PORT}`);
});
