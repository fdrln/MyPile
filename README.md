# MyPile

A personal backlog tracker for movies, TV shows, games and books.

> Built as a learning project to explore React, REST APIs and full-stack development. It's still a WIP, there's some repeated code as well as some bandaid fixes that I'd like to replace.

---

## What it does

MyPile lets you keep track of everything you want to watch, play or read. Search across movies, TV shows, games and books, add them to your pile, and remove them when you're done.

- Browse trending content for inspiration
- Search across all four categories
- Add and remove items from your personal pile
- Mobile UI for easier navigation

---

## Demo

<p align="center">
  <img src="https://github.com/user-attachments/assets/96c88948-32a5-4a82-8ba3-b19051097418" width="65%" alt="MyPile desktop" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/8c4e11d9-5baa-4661-9567-3141eac49d41" width="22%" alt="MyPile mobile" />
</p>

https://github.com/user-attachments/assets/571db748-a961-4164-b0d8-bb48b8b24e76

---

## Tech Stack

**Frontend**

- React + TypeScript (Vite)
- Mantine UI
- React Router

**Backend**

- Java 21 + Spring Boot 4
- Spring Data JPA
- SQLite

---

## APIs

All external API calls go through the backend — no API keys are ever exposed to the browser.

| API                                      | Used for            |
| ---------------------------------------- | ------------------- |
| [TMDB](https://www.themoviedb.org/)      | Movies and TV shows |
| [RAWG](https://rawg.io/)                 | Games               |
| [Open Library](https://openlibrary.org/) | Books               |

_This product uses the TMDB API but is not endorsed or certified by TMDB._

---

## Docker Setup

Get a free API key from TMDB and RAWG.

Change `.env.example` to `.env` and fill in your keys

```
TMDB_API_KEY=your_tmdb_key_here
RAWG_API_KEY=your_rawg_key_here
```

Then run `docker-compose up --build` from project root.

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

- Status tracking (want / finished) not yet implemented
- Search function
- Some code repeats itself through multiple files
- Some files have too much going on and should be seperated

---
