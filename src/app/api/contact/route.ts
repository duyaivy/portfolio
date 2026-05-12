import { NextResponse } from "next/server";

import { sendContactEmails } from "@/src/lib/contact/mailer";
import { ContactPayload } from "@/src/lib/contact/types";
import {
  ContactValidationError,
  parseContactPayload
} from "@/src/lib/contact/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const contact = parseContactPayload(payload);

    await sendContactEmails(contact);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ContactValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("[contact] Failed to send email:", error);

    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
