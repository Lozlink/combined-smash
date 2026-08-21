"use server";

import { sendQuoteRequestEmail } from "@/lib/mailer";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  formError?: string;
  errors?: Partial<Record<"name" | "phone" | "message", string>>;
  // Echo of what was submitted, so a failed submit doesn't wipe the form.
  values?: Partial<
    Record<"name" | "phone" | "email" | "vehicle" | "insurer" | "message", string>
  >;
};

export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: real visitors never see this field, so a value means a bot.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const field = (key: string) => String(formData.get(key) ?? "").trim();

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const vehicle = field("vehicle");
  const insurer = field("insurer");
  const message = field("message");

  const errors: QuoteFormState["errors"] = {};
  if (!name) {
    errors.name = "Enter your name.";
  }
  if (!/^[0-9\s()+-]{8,20}$/.test(phone)) {
    errors.phone = "Enter a phone number we can call you on.";
  }
  if (!message) {
    errors.message = "Tell us what happened, or what the car needs.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      formError: "A couple of fields need attention before we can send this.",
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
      formError:
        "We couldn’t send your request just now — please try again, or call us on (02) 9799 9433.",
      values: { name, phone, email, vehicle, insurer, message },
    };
  }

  return { status: "success" };
}
