# Bloglist

Full-stack blog listing application built for Full Stack Open 2025 Part 7. Users can create, like, and delete blog posts, browse other users, and leave comments.

## Project Structure

```
bloglist/
├── backend/    # Express 5 + MongoDB
└── frontend/   # React 19 + Vite
```

## Tech Stack

**Backend**
- Express 5, Mongoose 8
- JWT authentication (`jsonwebtoken`), bcrypt
- Node.js built-in test runner + Supertest

**Frontend**
- React 19, React Router v7
- Redux Toolkit + React Redux (client state)
- TanStack Query v5 (server state)
- React-Bootstrap (UI)
- Axios, Prettier, ESLint

## Getting Started

Run backend and frontend in separate terminals.

**Backend** (port 3003)
```bash
cd backend
npm install
npm run dev
```

**Frontend** (port 5173, proxies `/api` → `localhost:3003`)
```bash
cd frontend
npm install
npm run dev
```

**Production build** (serves frontend from backend)
```bash
cd backend
npm run build:ui   # builds frontend and copies dist/ to backend/dist/
npm start
```

## Environment Variables

Create `backend/.env`:

```
MONGODB_URI=<your-mongodb-uri>
TEST_MONGODB_URI=<your-test-mongodb-uri>
PORT=3003
SECRET=<jwt-secret>
```

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/login` | — | Login, returns JWT |
| GET | `/api/users` | — | List all users |
| POST | `/api/users` | — | Register user |
| GET | `/api/blogs` | — | List all blogs |
| POST | `/api/blogs` | JWT | Create blog |
| PUT | `/api/blogs/:id` | JWT | Update blog |
| DELETE | `/api/blogs/:id` | JWT (owner) | Delete blog |
| GET | `/api/blogs/:id/comments` | — | Get comments |
| POST | `/api/blogs/:id/comments` | — | Add comment |

## Frontend Architecture

### State Management

| State | Tool | Location |
|-------|------|----------|
| Logged-in user | Redux slice | `src/reducers/userReducer.js` |
| Notifications | Redux slice | `src/reducers/notificationReducer.js` |
| Blog data | TanStack Query | `queryKey: ['blogs']` |
| User list | TanStack Query | `queryKey: ['users']` |

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `BlogList` + `CreateBlogForm` | Home — sorted blog list |
| `/users` | `Users` | All users with blog counts |
| `/users/:id` | `UserView` | Individual user's blogs |
| `/blogs/:id` | `BlogView` | Blog detail with comments |
| `*` | `NotFound` | 404 fallback |

### Key Behaviours

- **JWT expiry check on load** — token's `exp` field is decoded client-side; expired sessions are cleared from localStorage immediately without a network round-trip.
- **Auto-logout on 401** — a global Axios interceptor dispatches `logout()` if any API call returns 401 (e.g. mid-session token expiry).
- **Error boundary** — catches render errors in the route tree, shows the error message and a "try again" button.

## Frontend Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # ESLint
npm run format    # Prettier (writes in place)
```

## VS Code

Install the **Prettier - Code formatter** extension (`esbenp.prettier-vscode`). Format-on-save is configured in `.vscode/settings.json`.
