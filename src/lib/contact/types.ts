export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type EmailContent = {
  subject: string;
  text: string;
  html: string;
};
