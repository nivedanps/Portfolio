import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be 200 characters or fewer")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or fewer")
    .trim(),
});

