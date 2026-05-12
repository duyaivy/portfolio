import nodemailer from "nodemailer";

import { buildAuthorEmail, buildThankYouEmail } from "./email-templates";
import { ContactMessage } from "./types";

type ContactMailerConfig = {
  authorEmail: string;
  from: string;
  host: string;
  pass: string;
  port: number;
  secure: boolean;
  user: string;
};

function getContactMailerConfig(): ContactMailerConfig {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const authorEmail = process.env.AUTHOR_EMAIL;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !authorEmail || !from) {
    throw new Error("Missing SMTP contact email environment variables.");
  }

  return {
    authorEmail,
    from,
    host,
    pass,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    user
  };
}

export async function sendContactEmails(contact: ContactMessage) {
  const { authorEmail, from, host, pass, port, secure, user } =
    getContactMailerConfig();
  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });

  await Promise.all([
    transport.sendMail({
      from,
      to: authorEmail,
      replyTo: contact.email,
      ...buildAuthorEmail(contact)
    }),
    transport.sendMail({
      from,
      to: contact.email,
      replyTo: authorEmail,
      ...buildThankYouEmail(contact)
    })
  ]);
}
