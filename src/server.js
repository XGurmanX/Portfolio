import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

const staticPath = path.join(__dirname, "..", "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(staticPath));

const sendPage = (res, page) =>
  res.sendFile(path.join(staticPath, page));

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
};

app.get("/", (_req, res) => sendPage(res, "index.html"));
app.get("/projects", (_req, res) => sendPage(res, "projects.html"));
app.get("/experience", (_req, res) => sendPage(res, "experience.html"));
app.get("/skills", (_req, res) => sendPage(res, "skills.html"));
app.get("/about", (_req, res) => sendPage(res, "about.html"));
app.get("/contact", (_req, res) => sendPage(res, "contact.html"));

app.post("/contact", async (req, res) => {
  const { name = "No name provided", email = "No email provided", message = "" } = req.body || {};
  const transporter = getTransporter();

  if (!transporter) {
    console.warn("SMTP not configured; unable to send contact email.");
    return res.redirect("/contact?sent=0&reason=config");
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || "pannug598@gmail.com",
      subject: "New portfolio message",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return res.redirect("/contact?sent=1");
  } catch (err) {
    console.error("Contact email failed", err);
    return res.redirect("/contact?sent=0&reason=send");
  }
});

app.get("/resume", (_req, res) => {
  const resumePath = path.join(staticPath, "resume", "Gurman_Pannu_Resume.txt");
  res.sendFile(resumePath);
});

app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(staticPath, "404.html"));
});

app.listen(port, () => {
  console.log(`Portfolio listening on port ${port}`);
});
