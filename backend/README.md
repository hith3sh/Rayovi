# Rayovi Backend

This is the backend API for Rayovi, built with Express.js, Prisma, and PostgreSQL.

## Stack
- **Express.js** — REST API framework
- **Prisma** — Type-safe ORM for PostgreSQL
- **PostgreSQL** — Relational database
- **dotenv** — Environment variable management

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your `DATABASE_URL` for PostgreSQL.

3. **Prisma setup:**
   - Edit `prisma/schema.prisma` to define your data models.
   - Run migrations:
     ```sh
     npx prisma migrate dev --name init
     ```
   - Generate Prisma client:
     ```sh
     npx prisma generate
     ```

4. **Start the server:**
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:4000` by default.

## Deployment
- The backend is designed to be containerized with Docker and deployed on Railway.app or similar platforms.

---

**Rayovi Backend** — API for YouTube lovers who want more than YouTube offers. 