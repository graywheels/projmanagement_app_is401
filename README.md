# Dino Camp Roster

A full-stack application for managing campers at Dino Discovery Camp, built by Austin Wheeler.

## Project Structure

```
.
├── frontend/     # React + Vite frontend application
├── backend/     # Express.js API server
└── db/          # PostgreSQL database schema and seed scripts
```

## Technologies

### Frontend
- **Vite** - Build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Styling

### Backend
- **Express.js** - Web server framework
- **PostgreSQL** - Database (via `pg` driver)
- **Node.js** - Runtime environment

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- PostgreSQL installed and running
- A PostgreSQL database named `dinocamp` (or update `.env` with your database name)

### Setup

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd dino-camp-roster-frontend-only
   ```

2. **Set up the database**
   ```sh
   # Create the database (if it doesn't exist)
   createdb dinocamp

   # Run the schema to create tables
   psql -d dinocamp -f db/schema.sql

   # Seed initial data
   psql -d dinocamp -f db/seed.sql
   ```

3. **Set up the backend**
   ```sh
   cd backend
   npm install

   # Copy the example env file and update with your database credentials
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

4. **Set up the frontend**
   ```sh
   cd ../frontend
   npm install

   # Optionally copy and configure .env.example if you need a different API URL
   cp .env.example .env
   ```

### Running the Application

1. **Start the backend server** (from `backend/` directory)
   ```sh
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:4000` (or the port specified in your `.env`)

2. **Start the frontend dev server** (from `frontend/` directory)
   ```sh
   cd frontend
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173` (Vite's default port)

3. **Open your browser** and navigate to the frontend URL shown in the terminal

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /users` - Fetch all campers
- `PUT /users/:id/username` - Update a camper's username

## Environment Variables

### Backend (`backend/.env`)
- `PORT` - Server port (default: 4000)
- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - Database name (default: dinocamp)

### Frontend (`frontend/.env`)
- `VITE_API_URL` - Backend API URL (default: http://localhost:4000)

## Database Schema

The `users` table includes:
- `id` - Primary key (SERIAL)
- `first_name` - Camper's first name
- `last_name` - Camper's last name
- `email` - Unique email address
- `cohort` - Camp cohort/group
- `username` - Unique username (editable)
- `emoji` - Display emoji

## Development

- Frontend changes hot-reload automatically via Vite
- Backend requires a restart after code changes
- Database changes require re-running the schema/seed scripts or manual migrations

## Author

**Austin Wheeler**
