/**
 * AWS SES mailer — server-only.
 *
 * Credentials are passed explicitly to the SESClient constructor so that
 * Vercel/Lambda runtime ambient AWS_* environment variables (which may be
 * scoped to a different AWS account or role) do not shadow the SES-specific
 * keys configured for this service.
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

/** HTML-escape a value before interpolating it into an email body. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let _sesClient: SESClient | null = null;

function getSesClient(): SESClient {
  if (_sesClient) return _sesClient;

  const region = process.env.SES_AWS_REGION;
  const accessKeyId = process.env.SES_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SES_AWS_SECRET_ACCESS_KEY;

  if (!region) {
    throw new Error("mailer: SES_AWS_REGION environment variable is not set.");
  }
  if (!accessKeyId) {
    throw new Error(
      "mailer: SES_AWS_ACCESS_KEY_ID environment variable is not set.",
    );
  }
  if (!secretAccessKey) {
    throw new Error(
      "mailer: SES_AWS_SECRET_ACCESS_KEY environment variable is not set.",
    );
  }

  _sesClient = new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return _sesClient;
}

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  insurer: string;
  message: string;
};

export async function sendQuoteRequestEmail(quote: QuoteRequest): Promise<void> {
  const fromEmail = process.env.QUOTE_FROM_EMAIL;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  if (!fromEmail) {
    throw new Error("mailer: QUOTE_FROM_EMAIL environment variable is not set.");
  }
  if (!toEmail) {
    throw new Error("mailer: QUOTE_TO_EMAIL environment variable is not set.");
  }

  const rows: [string, string][] = [
    ["Name", quote.name],
    ["Phone", quote.phone],
    ["Email", quote.email || "—"],
    ["Vehicle", quote.vehicle || "—"],
    ["Insurer", quote.insurer || "— (private work)"],
    ["What happened", quote.message],
  ];

  const htmlBody = `
<html>
  <body>
    <p>A quote request just came through the website form:</p>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border:1px solid #ccc"><strong>${esc(label)}</strong></td><td style="border:1px solid #ccc">${esc(value)}</td></tr>`,
        )
        .join("\n      ")}
    </table>
    <p>Reply to this email or call the customer on ${esc(quote.phone)}.</p>
  </body>
</html>
`.trim();

  const textBody = [
    "A quote request just came through the website form:",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Reply to this email or call the customer on ${quote.phone}.`,
  ].join("\n");

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [toEmail],
    },
    // Replying in the mail client goes straight to the customer when they
    // left an email address.
    ReplyToAddresses: quote.email ? [quote.email] : undefined,
    Message: {
      Subject: {
        Data: `New quote request — ${quote.name}`,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: "UTF-8",
        },
        Text: {
          Data: textBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  await getSesClient().send(command);
}
