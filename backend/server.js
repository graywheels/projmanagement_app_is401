const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "dinocamp",
});

app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    // Intentionally minimal error response for health check
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.get("/users", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, first_name || ' ' || last_name AS name, username, emoji FROM users ORDER BY id"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.put("/users/:id/username", async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, first_name || ' ' || last_name AS name, username, emoji",
      [username.trim(), id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update username" });
  }
});

app.listen(PORT, () => {
  console.log(`DinoCamp backend listening on http://localhost:${PORT}`);
});

