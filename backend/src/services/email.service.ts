import nodemailer from "nodemailer";
import type { ContactFormData } from "@shared/types/contact.types";
import { config } from "../config";

function getTransporter() {
  const user = config.gmailUser;
  const pass = config.gmailAppPassword;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error(
      "Email service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables."
    );
  }

  const receiver = config.contactReceiverEmail;
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px; margin-bottom: 20px;">
        New Portfolio Contact
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; width: 120px; vertical-align: top;">Name</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">${escapeHtml(data.name)}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Email</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">
            <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Subject</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">${escapeHtml(data.subject)}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Message</td>
          <td style="padding: 10px 12px; color: #1a1a1a; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Submitted</td>
          <td style="padding: 10px 12px; color: #888; font-size: 13px;">${timestamp}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5; color: #999; font-size: 12px;">
        This message was sent from the portfolio contact form.
      </p>
    </div>
  `;

  const textBody = [
    `New Portfolio Contact`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `Submitted: ${timestamp}`,
  ].join("\n");

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.gmailUser}>`,
    to: receiver,
    replyTo: data.email,
    subject: `New Portfolio Contact — ${data.subject}`,
    text: textBody,
    html: htmlBody,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

