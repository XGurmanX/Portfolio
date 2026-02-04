import nodemailer from "nodemailer";

export const hasSmtpConfig = (smtp) =>
  Boolean(smtp.host && smtp.port && smtp.user && smtp.pass);

export async function sendContactEmail({ name, email, message }, smtp) {
  if (!hasSmtpConfig(smtp)) {
    throw new Error("SMTP configuration missing");
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${smtp.user}>`,
    to: smtp.to,
    subject: "New portfolio message",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  });
}
