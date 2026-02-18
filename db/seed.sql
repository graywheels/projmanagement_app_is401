-- Seed data for the DinoCamp "users" table
-- Run after applying schema.sql, against the "dinocamp" database.
--
-- Example:
--   psql -d dinocamp -f seed.sql

INSERT INTO users (first_name, last_name, email, cohort, username, emoji) VALUES
  ('Maya', 'Johnson', 'maya.johnson@example.com', 'Triceratops', 'VelociMaya', '🦕'),
  ('Liam', 'Chen', 'liam.chen@example.com', 'Velociraptor', 'TriceraLiam', '🦖'),
  ('Sofia', 'Ramirez', 'sofia.ramirez@example.com', 'Stegosaurus', 'StegoSofia', '🦴'),
  ('Noah', 'Williams', 'noah.williams@example.com', 'Pterodactyl', 'RexNoah', '🌋')
ON CONFLICT (email) DO NOTHING;

