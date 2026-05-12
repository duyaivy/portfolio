import { ContactMessage, ContactPayload } from "./types";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 180;
const MAX_MESSAGE_LENGTH = 4000;

export class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactValidationError";
  }
}

function cleanValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseContactPayload(payload: ContactPayload): ContactMessage {
  const name = cleanValue(payload.name);
  const email = cleanValue(payload.email);
  const message = cleanValue(payload.message);

  if (!name || !email || !message) {
    throw new ContactValidationError(
      "Name, email, and message are required."
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !isValidEmail(email)
  ) {
    throw new ContactValidationError(
      "Please check your contact details and message length."
    );
  }

  return {
    name,
    email,
    message
  };
}
