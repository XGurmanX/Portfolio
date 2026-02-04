export function loadConfig() {
  const port = Number(process.env.PORT) || 8080;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;

  return {
    port,
    smtp: {
      host: process.env.SMTP_HOST,
      port: smtpPort,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
      to: process.env.CONTACT_TO || "pannug598@gmail.com"
    }
  };
}
