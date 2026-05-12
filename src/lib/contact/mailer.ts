import { resolve4 } from "node:dns/promises";
import { isIP } from "node:net";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { buildAuthorEmail, buildThankYouEmail } from "./email-templates";
import { ContactMessage } from "./types";

type ContactMailerConfig = {
  authorEmail: string;
  family: 4 | 6;
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
  const family = Number(process.env.SMTP_FAMILY ?? 4);

  if (!host || !user || !pass || !authorEmail || !from) {
    throw new Error("Missing SMTP contact email environment variables.");
  }

  if (family !== 4 && family !== 6) {
    throw new Error("SMTP_FAMILY must be 4 or 6.");
  }

  return {
    authorEmail,
    family,
    from,
    host,
    pass,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    user
  };
}

async function resolveSmtpHost(host: string, family: 4 | 6) {
  if (family !== 4 || isIP(host)) {
    return host;
  }

  const [ipv4Host] = await resolve4(host);

  if (!ipv4Host) {
    throw new Error(`Unable to resolve IPv4 address for SMTP host ${host}.`);
  }

  return ipv4Host;
}

export async function sendContactEmails(contact: ContactMessage) {
  const { authorEmail, family, from, host, pass, port, secure, user } =
    getContactMailerConfig();
  const resolvedHost = await resolveSmtpHost(host, family);
  const transportOptions: SMTPTransport.Options = {
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    host: resolvedHost,
    port,
    secure,
    socketTimeout: 15000,
    tls: {
      servername: host
    },
    auth: {
      user,
      pass
    }
  };
  const transport = nodemailer.createTransport(transportOptions);

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
