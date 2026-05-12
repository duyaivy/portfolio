import { ContactMessage, EmailContent } from "./types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function preserveLineBreaks(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

export function buildAuthorEmail({
  name,
  email,
  message
}: ContactMessage): EmailContent {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = preserveLineBreaks(message);

  return {
    subject: `New portfolio message from ${name}`,
    text: [
      "New message from portfolio contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n"),
    html: `
      <div>
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `
  };
}

export function buildThankYouEmail({
  name,
  message
}: ContactMessage): EmailContent {
  const safeName = escapeHtml(name);
  const safeMessage = preserveLineBreaks(message);

  return {
    subject: "Thanks for reaching out",
    text: [
      `Hi ${name},`,
      "",
      "Thanks for reaching out through my portfolio. I received your message and will get back to you soon.",
      "",
      "Your message:",
      message,
      "",
      "Best,",
      "Nguyen Quoc Duy"
    ].join("\n"),
    html: `
      <!doctype html>
      <html>
        <body style="margin:0;background:#181818;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#181818;padding:32px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border:1px solid #303030;background:#303030;">
                  <tr>
                    <td style="padding:40px 34px 28px;border-top:4px solid #da291c;">
                      <p style="margin:0 0 14px;color:#ffc72c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                        Message Received
                      </p>
                      <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.05;font-weight:700;text-transform:uppercase;letter-spacing:0;">
                        Thanks for getting in touch.
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 34px;">
                      <div style="background:#181818;border:1px solid #3a3a3a;padding:26px;">
                        <p style="margin:0 0 18px;color:#ffffff;font-size:16px;line-height:1.7;">
                          Hi ${safeName},
                        </p>
                        <p style="margin:0 0 20px;color:#d5d5d5;font-size:15px;line-height:1.8;">
                          Thanks for reaching out through my portfolio. I received your message and will get back to you soon.
                        </p>
                        <p style="margin:0 0 10px;color:#8f8f8f;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">
                          Your Message
                        </p>
                        <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.8;">
                          ${safeMessage}
                        </p>
                      </div>
                      <p style="margin:24px 0 0;color:#8f8f8f;font-size:12px;line-height:1.7;">
                        Nguyen Quoc Duy / duyaivy<br />
                        Full Stack Developer
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
  };
}
