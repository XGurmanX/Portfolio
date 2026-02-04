import path from "node:path";
import express from "express";
import { sendContactEmail, hasSmtpConfig } from "./contact.js";

export function registerRoutes(app, staticPath, smtpConfig) {
  const router = express.Router();
  const sendPage = (res, parts) => res.sendFile(path.join(staticPath, ...parts));

  router.get("/", (_req, res) => sendPage(res, ["home", "home.html"]));
  router.get("/projects", (_req, res) => sendPage(res, ["projects", "projects.html"]));
  router.get("/experience", (_req, res) => sendPage(res, ["experience", "experience.html"]));
  router.get("/skills", (_req, res) => sendPage(res, ["skills", "skills.html"]));
  router.get("/about", (_req, res) => sendPage(res, ["about", "about.html"]));
  router.get("/contact", (_req, res) => sendPage(res, ["contact", "contact.html"]));

  router.post("/contact", async (req, res) => {
    const { name = "No name provided", email = "No email provided", message = "" } = req.body || {};

    if (!hasSmtpConfig(smtpConfig)) {
      console.warn("SMTP not configured; unable to send contact email.");
      return res.redirect("/contact?sent=0&reason=config");
    }

    try {
      await sendContactEmail({ name, email, message }, smtpConfig);
      return res.redirect("/contact?sent=1");
    } catch (err) {
      console.error("Contact email failed", err);
      return res.redirect("/contact?sent=0&reason=send");
    }
  });

  router.get("/healthz", (_req, res) => res.json({ status: "ok" }));

  app.use(router);

  app.use((_req, res) => {
    res.status(404).sendFile(path.join(staticPath, "404", "404.html"));
  });
}
