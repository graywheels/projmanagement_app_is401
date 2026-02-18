-- Run this against the "dinocamp" database.
--
-- Example:
--   createdb dinocamp
--   psql -d dinocamp -f schema.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cohort TEXT NOT NULL,
  username TEXT NOT NULL,
  emoji TEXT NOT NULL
);

