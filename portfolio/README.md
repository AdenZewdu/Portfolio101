
# Portfolio CMS

A full-stack portfolio CMS with a public portfolio website, protected admin dashboard, Express REST API, JWT authentication, and MySQL database.

## Project Structure

```text
Portfolio-CMS/
├── portfolio/   Public React portfolio website
├── admin/       Protected React admin dashboard
└── backend/     Express REST API
```

## Features

- Public portfolio website with smooth scrolling navigation
- Dynamic hero/profile content from MySQL
- Project cards with image previews
- Projects CRUD from protected admin dashboard
- Skills CRUD from protected admin dashboard
- Editable profile content
- Functional contact form
- Admin messages inbox
- Gmail reply shortcut for messages
- Read/unread message status
- Protected admin login
- JWT authentication
- bcrypt password hashing
- MySQL database
- Responsive interface

## Tech Stack

### Portfolio Frontend

- React
- Vite
- CSS

### Admin Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- MySQL
- JWT
- bcryptjs
- dotenv
- CORS

## Local Setup

### 1. Clone / Open Project

```bash
cd Portfolio-CMS
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=5000
JWT_SECRET=your_long_secret_key

DB_HOST=localhost
DB_USER=portfolio_user
DB_PASSWORD=portfolio123
DB_NAME=portfolio_cms
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Portfolio Setup

Open another terminal:

```bash
cd portfolio
npm install
npm run dev
```

### 4. Admin Setup

Open another terminal:

```bash
cd admin
npm install
npm run dev
```

## Database Tables

The project uses MySQL tables:

```text
admin_users
projects
skills
profile
messages
```

## API Routes



### Project Data Includes

```text
id
title
description
tech
link
imageUrl



### Auth

```text
POST /api/auth/login
```

### Projects

```text
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Skills

```text
GET    /api/skills
POST   /api/skills
DELETE /api/skills/:id
```

### Profile

```text
GET /api/profile
PUT /api/profile
```

### Messages

```text
GET    /api/messages
POST   /api/messages
PATCH  /api/messages/:id/read
DELETE /api/messages/:id
```

## Admin Access

Admin dashboard requires login.

```text
Email: admin@example.com
Password: configured in database
```

## Deployment Plan

Recommended deployment:

```text
Portfolio frontend → Vercel
Admin frontend     → Vercel
Backend API        → Render
Database           → Hosted MySQL
```

## Notes

The public portfolio does not require login. Only the admin dashboard is protected.

```md
## CMS Notes

The admin dashboard manages portfolio content stored in MySQL. The public portfolio reads this content through the Express API, so updates made in the admin are reflected on the public site after refresh.