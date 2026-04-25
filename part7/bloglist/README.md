# Bloglist — Full Stack Open Part 7

Full-stack blog listing application. Backend built in Part 4, frontend in Part 5, now combined into a single repository for Part 7 refactoring exercises (7.7–7.20).

## Project Structure

```
bloglist/
├── backend/    # Express + MongoDB (Node.js)
└── frontend/   # React + Vite
```

## Getting Started

**Backend** (port 3003):
```bash
cd backend
npm install
npm run dev
```

**Frontend** (port 5173, proxies `/api` → `localhost:3003`):
```bash
cd frontend
npm install
npm run dev
```

Run both simultaneously in separate terminals.

**Production build** (serve frontend from backend):
```bash
cd backend
npm run build:ui   # builds frontend and copies dist/ to backend
npm start
```

## Environment Variables

Backend requires `backend/.env`:
```
MONGODB_URI=<your-mongodb-uri>
PORT=3003
TEST_MONGODB_URI=<your-test-mongodb-uri>
SECRET=<jwt-secret>
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/login` | — | Login, returns JWT |
| GET | `/api/users` | — | List all users |
| POST | `/api/users` | — | Register user |
| GET | `/api/blogs` | — | List all blogs |
| POST | `/api/blogs` | JWT | Create blog |
| PUT | `/api/blogs/:id` | JWT | Update blog (likes etc.) |
| DELETE | `/api/blogs/:id` | JWT | Delete blog (owner only) |
| GET | `/api/blogs/:id/comments` | — | Get comments |
| POST | `/api/blogs/:id/comments` | — | Add comment |

## Tech Stack

**Backend:** Express 5, Mongoose, JWT (`jsonwebtoken`), bcrypt  
**Frontend:** React 19, React Router v7, TanStack Query v5, Axios

## Part 7 Refactoring Exercises

### 7.7 — Frontend and backend in the same repository
Combine into a single repo with separate `package.json` files. ✅

### 7.8 — Error boundary
Implement `ErrorBoundary` component to catch render errors gracefully. ✅

### 7.9 — Nonexisting routes
Handle unknown routes with a "Page not found" message via React Router splat route. ✅

### 7.10 — Automatic code formatting
Integrate Prettier with format-on-save.

### 7.11–7.14 — State management
Refactor global state using **React Query + Context**:
- Notification state via `NotificationContext`
- Blog data via TanStack Query (fetch, create, like, delete)
- User/login state via `UserContext`

### 7.15 — Clean up the code
- Extract localStorage logic into `storageService`
- Use `useField` custom hook in forms

### 7.16 — Users view
Display all users with their blog post counts at `/users`. ✅

### 7.17 — Individual user view
Show each user's blogs at `/users/:id` via clickable name links. ✅

### 7.18 — Comments, step 1
Fetch and display anonymous comments on individual blog pages. ✅

### 7.19 — Comments, step 2
Allow users to add comments through the frontend. ✅

### 7.20 — Styling
Improve UI appearance (Bootstrap / custom CSS).