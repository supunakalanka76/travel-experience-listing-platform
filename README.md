# Travel Experience Listing Platform

## Project Overview
Travel Experience Listing Platform is a full-stack web application where users can sign up, log in, and create travel experience listings (title, location, description, image, and optional price). Visitors can browse a public feed of listings, open a detailed listing page, and logged-in users can manage their own listings.

---

## Tech Stack
**Frontend**
- Next.js (App Router) + React
- Tailwind CSS
- Axios (API calls)

**Backend**
- Node.js + Express
- MongoDB + Mongoose (database + ODM)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

---

## Setup Instructions

### 1) Clone the repository
```bash
git clone https://github.com/supunakalanka76/travel-experience-listing-platform.git
cd travel-experience-listing-platform
```

### 2) Backend (Express server)
```bash
cd server
npm install
```

Create a file called `server/.env`:
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET
```

Run the backend:
```bash
npm run dev
```

Server will run at:
- `http://localhost:5000`

### 3) Frontend (Next.js client)
Open a new terminal:
```bash
cd client
npm install
```

(Optional) Create `client/.env.local` if you want to override the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the client:
```bash
npm run dev
```

Client will run at:
- `http://localhost:3000`

---

## Features Implemented
- User registration and login (JWT-based auth)
- Create travel listings (authenticated)
- Public feed of listings
- Listing detail page
- “My Listings” page (view and manage own listings)
- Update/Delete listing (restricted to the owner and within 24 hours)
- Save/Unsave listings (per-user saved list)
- Search listings by keyword (title/location/description) via `GET /api/listings?q=...` (server-side filtering)

---

## Architecture & Key Decisions

### Why I chose this technology stack
I chose **Next.js + React** for a fast, modern UI and good routing/layout patterns using the App Router. For the backend, **Express** is simple and flexible, and **MongoDB + Mongoose** works well with the listing data model (document-like listings with a reference to the user). Axios keeps client-server calls straightforward, and Tailwind CSS helps build consistent UI quickly.

### How authentication works
Users authenticate via **JWT**. On login/register, the server returns a token that the client stores in `localStorage`. For protected routes, the client sends the token in the `Authorization: Bearer <token>` header using an Axios request interceptor. The server verifies the token in middleware (`protect`) and attaches the authenticated user information to `req.user`.

### How travel listings are stored in the database
Listings are stored in a MongoDB collection using a Mongoose `Listing` model (fields like `title`, `location`, `image`, `description`, `price`, plus a `user` reference). Each listing includes `timestamps` (`createdAt`, `updatedAt`). When querying listings, the backend uses `.populate("user", "name")` so the client can show the author name.

### One improvement I would implement with more time
I would implement **pagination/infinite scrolling** with cursor-based pagination to avoid loading all listings at once. I’d also improve search by using **MongoDB Atlas Search** (or a proper text index + ranking) and add filters (price range, location tags) for a better browsing experience.

---

## Product Thinking Question (Required)
If this platform had 10,000 travel listings, I would add server-side pagination (or infinite scroll) so the feed loads quickly and only requests small chunks of data. I would also add database indexes for fields used in sorting and filtering (like `createdAt`, and indexed fields for search). For search, I would move from regex-based matching to a more scalable approach like MongoDB Atlas Search or text indexes with relevance ranking. On the API side, I would return only the fields needed for the feed (summary payload) and fetch full details only on the detail page. I would add caching for popular requests (e.g., page 1 of the feed) using a CDN or Redis. Finally, I would optimize images (proper sizes, placeholders) and add loading skeletons to improve perceived performance.