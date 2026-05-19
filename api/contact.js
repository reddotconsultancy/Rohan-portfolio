import nodemailer from "nodemailer";

const DEFAULT_TO_EMAIL = "founder@rohandsouza.xyz";
const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_PORT = 465;
const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";

class PublicEmailError extends Error {
  constructor(message, status = 502, details = "") {
    super(message);
    this.name = "PublicEmailError";
    this.status = status;
    this.details = details;
  }
}

function clean(value, maxLength = 1200) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function getEmailConfig() {
  const provider = clean(process.env.EMAIL_PROVIDER, 24).toLowerCase();
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  if (provider === "resend") return "resend";
  if (provider === "smtp") return "smtp";
  if (hasResend) return "resend";
  if (hasSmtp) return "smtp";
  return "";
}

function getEmailContent({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return {
    text: [
      "New website enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#101116">
        <h2 style="margin:0 0 16px">New website enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
        <p style="white-space:normal">${safeMessage}</p>
      </div>
    `,
  };
}

async function sendWithResend({ name, email, subject, content }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL || process.env.LEAD_TO_EMAIL || DEFAULT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new PublicEmailError(
      "Email service is not configured yet. Set RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel.",
      500,
    );
  }

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New website lead: ${subject}`,
      reply_to: email,
      text: content.text,
      html: content.html,
      tags: [
        { name: "source", value: "rohan_website" },
        { name: "lead_name", value: name.replace(/[^a-z0-9_-]/gi, "_").slice(0, 50) || "lead" },
      ],
    }),
  });

  if (!response.ok) {
    const failure = await response.text().catch(() => "");
    const authFailed = response.status === 401 || response.status === 403;

    throw new PublicEmailError(
      authFailed
        ? "Email API key was rejected. Please update RESEND_API_KEY in Vercel."
        : "Email provider rejected the message. Please use the direct email link.",
      authFailed ? 502 : response.status,
      failure,
    );
  }
}

async function sendWithSmtp({ email, subject, content }) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new PublicEmailError(
      "Email service is not configured yet. Set SMTP_USER and SMTP_PASS in Vercel.",
      500,
    );
  }

  const to = process.env.LEAD_TO_EMAIL || DEFAULT_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || smtpUser;
  const host = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || DEFAULT_SMTP_PORT);
  const secure = String(process.env.SMTP_SECURE || "true") !== "false";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Rohan Dsouza Website" <${from}>`,
      to,
      replyTo: email,
      subject: `New website lead: ${subject}`,
      text: content.text,
      html: content.html,
    });
  } catch (error) {
    const authFailed = error?.code === "EAUTH" || error?.responseCode === 535;

    throw new PublicEmailError(
      authFailed
        ? "Email login failed on the mail server. Please update the SMTP mailbox password."
        : "Email service is temporarily unavailable. Please use the direct email link.",
      502,
      error?.message || "",
    );
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const body = parseBody(req);
  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const subject = clean(body.subject, 180) || "Website enquiry";
  const message = clean(body.message, 2400);

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "Please add your name, email, and message.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      ok: false,
      message: "Please enter a valid email address.",
    });
  }

  const provider = getEmailConfig();

  if (!provider) {
    return res.status(500).json({
      ok: false,
      message:
        "Email service is not configured yet. Set RESEND_API_KEY/RESEND_FROM_EMAIL or SMTP_USER/SMTP_PASS.",
    });
  }

  const content = getEmailContent({ name, email, subject, message });

  try {
    if (provider === "resend") {
      await sendWithResend({ name, email, subject, content });
    } else {
      await sendWithSmtp({ email, subject, content });
    }
  } catch (error) {
    console.error("[contact] email send failed", {
      provider,
      message: error?.message,
      details: error?.details,
    });

    return res.status(error?.status || 502).json({
      ok: false,
      message:
        error instanceof PublicEmailError
          ? error.message
          : "Email service is temporarily unavailable. Please use the direct email link.",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Message sent. Rohan will get back to you soon.",
  });
}
