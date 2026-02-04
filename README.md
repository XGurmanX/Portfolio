# Gurman Pannu
**Aspiring Software Engineer — systems-aware, pragmatic, focused on shipping reliable small projects.**

This repository powers my portfolio site (https://gurmanpannu.dev). It shows how I structure and deploy simple, maintainable software.

## What I focus on
- Shipping end-to-end: small front ends, simple APIs, deployable containers.
- Proven tools: Node/Express, HTML/CSS/JS, Docker, Cloud Run.
- Clarity over flash: minimal dependencies, straightforward structure, documented flow.

## Highlights in this repo
- Single-service Node/Express app serving static pages.
- Contact form wired to SMTP (demonstrates basic backend integration).
- Production-aware artifacts: Dockerfile, health check, and per-page folders.
- Per-page folders (`public/home`, `projects`, `experience`, `skills`, `about`, `contact`, `404`) plus shared assets in `public/assets/common`. Shared header/footer are loaded as HTML snippets at runtime to avoid repetition.

## Deployed home
Live at https://gurmanpannu.dev via Google Cloud Run with a custom domain.

## If you’re reviewing my work
- Browse `public/` for layout and styling choices.
- See `src/` for how config, routes, and mailer are separated.
- Shared styling and nav logic live in `public/assets/common`.
- Resume available on request (not stored in the repo).

Thanks for taking a look!
