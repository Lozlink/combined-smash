"use server";

import { cookies } from "next/headers";
import { sendQuoteRequestEmail } from "@/lib/mailer";
import { getDictionary, isLang, LANG_COOKIE } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  formError?: string;
  errors?: Partial<Record<"name" | "phone" | "message", string>>;
  // Echo of what was submitted, so a failed submit doesn't wipe the form.
  values?: Partial<
    Record<"name" | "phone" | "email" | "vehicle" | "insurer" | "message", string>
  >;
};

/**
 * Remember the visitor's language choice. Setting a cookie inside a Server
 * Action makes Next.js re-render the current route in the same response,
 * so the page flips language without any client-side state.
 */
export async function setLanguage(lang: string): Promise<void> {
  if (!isLang(lang)) {
    return;
  }
  (await cookies()).set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: real visitors never see this field, so a value means a bot.
  if (formData.get("company")) {
    return { status: "success" };
  }

  // Validation messages come back in whichever language the form was shown in.
  const t = getDictionary(await getLang()).errors;

  const field = (key: string) => String(formData.get(key) ?? "").trim();

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const vehicle = field("vehicle");
  const insurer = field("insurer");
  const message = field("message");

  const errors: QuoteFormState["errors"] = {};
  if (!name) {
    errors.name = t.name;
  }
  if (!/^[0-9\s()+-]{8,20}$/.test(phone)) {
    errors.phone = t.phone;
  }
  if (!message) {
    errors.message = t.message;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      formError: t.form,
      values: { name, phone, email, vehicle, insurer, message },
    };
  }

  try {
    await sendQuoteRequestEmail({ name, phone, email, vehicle, insurer, message });
  } catch (error) {
    // Keep the enquiry recoverable from the server log — it must not vanish
    // just because SES was unreachable.
    console.error("[quote-request] send failed", error, {
      name,
      phone,
      email,
      vehicle,
      insurer,
      message,
      receivedAt: new Date().toISOString(),
    });
    return {
      status: "error",
      formError: t.send,
      values: { name, phone, email, vehicle, insurer, message },
    };
  }

  return { status: "success" };
}
