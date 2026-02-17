
# Gurman Pannu

**Software Engineer**  
I build small, production-ready systems with clean architecture and practical deployment workflows.

This repository powers my portfolio site:  
👉 https://gurmanpannu.dev

---

## What This Project Demonstrates

This is not just a static site — it reflects how I structure, containerize, and deploy applications in a production-aware way.

- Backend built with **Node.js + Express**
- REST-style routing and modular folder structure
- Static frontend served through structured per-page directories
- Containerized with **Docker**
- Deployed to **Google Cloud Run**
- CI/CD-driven deployment workflow

The focus is reliability, clarity, and maintainability — not overengineering.

---

## Architecture Overview

The project follows a simple, production-conscious layout:

src/                 → Backend configuration, routes, mailer logic  
public/  
--home/  
--projects/  
--experience/  
--skills/  
--about/  
--contact/  
--404/  
--assets/common/     → Shared styling, header/footer logic  

Dockerfile           → Containerized deployment  

Shared components (header/footer) are dynamically loaded at runtime to reduce duplication and improve maintainability.

---

## Backend Features

- Express server with environment-based configuration
- Contact form integration using SMTP (backend mail handling)
- Health check endpoint for container readiness
- Structured separation of configuration and routing logic

---

## Deployment

- Containerized with Docker
- Hosted on **Google Cloud Run**
- Custom domain configuration
- Zero-downtime deployment via automated pipeline

Live site: https://gurmanpannu.dev

---

## Design Philosophy

- Keep dependencies minimal  
- Keep structure readable  
- Build software that is easy to deploy  
- Favor clarity over cleverness  

---

## Resume

Available upon request.
