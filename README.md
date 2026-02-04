# Gurman Pannu — Engineering Portfolio

Clean, production-minded portfolio for https://gurmanpannu.dev. Single Node/Express service with Nunjucks templates, containerized for Google Cloud Run.

## Stack
- Node 20, Express 4 serving static HTML/CSS/JS
- Static assets in `public/`
- No database or secrets; fully stateless

## Local Development
```bash
npm install
npm run dev
# open http://localhost:8080
```

Environment:
- `PORT` (default: 8080)
- `NODE_ENV` (use `production` in containers)

## Project Structure
- `src/server.js` — Express server and routes
- `public/` — static assets (HTML, CSS, JS, resume placeholder)
- `Dockerfile` — production container build

### Contact form email
The contact form posts to `/contact` and sends an email via SMTP. Configure env vars (use a provider or Gmail app password):
- `SMTP_HOST`
- `SMTP_PORT` (e.g., 465 or 587)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE` (optional, set `"true"` for 465)
- `CONTACT_TO` (optional; default `pannug598@gmail.com`)

If SMTP isn’t configured, the form will show an error and suggest emailing directly.

## Docker
```bash
docker build -t gurmanpannu/portfolio .
docker run -p 8080:8080 -e PORT=8080 gurmanpannu/portfolio
```

## Deploy to Cloud Run
Assumes you have gcloud configured and a GCP project set.
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/gurmanpannu-portfolio
gcloud run deploy gurmanpannu-portfolio \
  --image gcr.io/PROJECT_ID/gurmanpannu-portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## Resume
Replace `public/resume/Gurman_Pannu_Resume.txt` with a PDF named `Gurman_Pannu_Resume.pdf` and adjust `src/server.js` if you change the filename.

$env:SMTP_HOST="smtp.gmail.com"
$env:SMTP_PORT="587"
$env:SMTP_USER="pannug598@gmail.com"
$env:SMTP_PASS="Cooper@2018@2018"
$env:SMTP_SECURE="false"    # use "true" if you switch to port 465
$env:CONTACT_TO="pannug598@gmail.com"
npm run dev