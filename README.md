# MyPile

A personal backlog tracker for movies, TV shows, games and books.

> Built as a learning project to explore React, REST APIs and full-stack development. The code reflects a genuine learning process — some parts are polished, others are honest work-in-progress.

---

## What it does

MyPile lets you keep track of everything you want to watch, play or read. Search across movies, TV shows, games and books, add them to your pile, and remove them when you're done.

- Browse trending content for inspiration
- Search across all four categories
- Add and remove items from your personal pile
- Clean, mobile-first UI with a desktop view too

---

## Demo

_GIFs coming soon_

---

## Tech Stack

**Frontend**

- React + TypeScript (Vite)
- Mantine UI
- React Router

**Backend**

- Java 21 + Spring Boot 3
- Spring Data JPA
- SQLite

---

## APIs

All external API calls are proxied through the backend — no API keys are ever exposed to the browser.

| API                                      | Used for            |
| ---------------------------------------- | ------------------- |
| [TMDB](https://www.themoviedb.org/)      | Movies and TV shows |
| [RAWG](https://rawg.io/)                 | Games               |
| [Open Library](https://openlibrary.org/) | Books               |

_This product uses the TMDB API but is not endorsed or certified by TMDB._

---

## Local Setup

### Prerequisites

- Node.js 18+
- Java 21
- Maven

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mypile.git
cd mypile
```

### 2. Backend

Get a free API key from [TMDB](https://www.themoviedb.org/settings/api) and [RAWG](https://rawg.io/apidocs).

Create `backend/src/main/resources/application-local.properties`:

```properties
spring.profiles.active=local
tmdb.api.key=your_tmdb_key
rawg.api.key=your_rawg_key
```

Then run:

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
mypile/
├── frontend/          # React application
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Route-level pages
│       ├── hooks/         # Custom React hooks
│       ├── services/      # Backend API calls
│       ├── context/       # React context (genres)
│       ├── types/         # TypeScript interfaces
│       └── constants/     # Shared constants
└── backend/           # Spring Boot API
    └── src/main/java/com/mypile/backend/
        ├── controller/    # REST endpoints
        ├── entities/      # JPA entities
        ├── repository/    # Spring Data repositories
        ├── service/       # Business logic
        └── config/        # App configuration
```

---

## Issues / Planned

- Too many inline styles
- No duplicate prevention yet
- Status tracking (want / finished) not yet implemented
- No Docker setup

---
