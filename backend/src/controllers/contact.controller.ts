import type { Request, Response } from "express";
import { contactFormSchema } from "@shared/schemas/contact.schema";
import { sendContactEmail } from "../services/email.service";
import {
  rollbackContactRateLimit,
  resetContactRateLimits,
} from "../middleware/rateLimiter";

export async function submitContact(req: Request, res: Response) {
  // 1. Honeypot check for spam bots
  if (req.body?._hp) {
    return res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  }

  // 2. Validate input schema with Zod
  const parseResult = contactFormSchema.safeParse(req.body);
  if (!parseResult.success) {
    const issueMessages = parseResult.error.issues
      .map((i) => i.message)
      .join(", ");
    return res.status(400).json({
      success: false,
      message:
        issueMessages || "Please check your entered details and try again.",
    });
  }

  // 3. Dispatch notification email
  try {
    await sendContactEmail(parseResult.data);
    return res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error: any) {
    // Roll back rate limit slot on delivery failure
    rollbackContactRateLimit(req);
    console.error("Failed to send contact email:", error?.message || error);

    // Never leak SMTP internal errors or credentials to visitors
    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
}

export function resetRateLimitsHandler(_req: Request, res: Response) {
  resetContactRateLimits();
  return res.json({ success: true, message: "Rate limits cleared" });
}

