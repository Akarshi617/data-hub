// ========================================
// THE DATA HUB — RESTful API Server
// Sprint 09 | Track B: Fullstack Developers
// ========================================

const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "sprint09-secret-key"; // demo only, never hardcode in real apps

// Parse incoming JSON bodies (needed for POST/PUT)
app.use(express.json());

// Serve the API Console UI from the public folder
app.use(express.static(path.join(__dirname, "public")));

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
// Helper functions (avoid repeating logic across routes)
// ----------------------------------------

// Validates blog payload before create/update
function validateBlogInput(title, content) {
  if (!title || !content) {
    return "Title and content are required";
  }
  return null;
}

// Parses and validates a numeric :id param, returns null if invalid
function parseBlogId(rawId) {
  const id = parseInt(rawId);
  return isNaN(id) ? null : id;
}

// Finds a blog by id, or undefined if not found
function findBlogById(id) {
  return blogs.find((b) => b.id === id);
}

// ----------------------------------------
// PHASE 1 + 2: Blog CRUD Endpoints
// ----------------------------------------

// Health check — moved off root since root now serves the UI
app.get("/api/health", (req, res) => {
  res.json({ message: "Welcome to The Data Hub API. Server is running." });
});

// GET all blogs
app.get("/api/blogs", (req, res) => {
  res.json({ success: true, count: blogs.length, data: blogs });
});

// GET single blog by id
app.get("/api/blogs/:id", (req, res) => {
  const id = parseBlogId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const blog = findBlogById(id);
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  res.json({ success: true, data: blog });
});

// POST — create a new blog (push to array)
app.post("/api/blogs", (req, res) => {
  const { title, content, author } = req.body;

  const validationError = validateBlogInput(title, content);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
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
  const id = parseBlogId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const blog = findBlogById(id);
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
  const id = parseBlogId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const exists = blogs.some((b) => b.id === id);
  if (!exists) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  blogs = blogs.filter((b) => b.id !== id);
  res.json({ success: true, message: `Blog ${id} deleted` });
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
// Fallback 404 handler — for any route not matched above
// ----------------------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ----------------------------------------
// Centralized error handler — catches unexpected crashes
// and returns clean JSON instead of an HTML error page
// ----------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// ----------------------------------------
// Start Server
// ----------------------------------------
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 The Data Hub API is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
