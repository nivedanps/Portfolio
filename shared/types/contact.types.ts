import type { z } from "zod";
import type { contactFormSchema } from "../schemas/contact.schema";

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactResponse {
  success: boolean;
  message: string;
}

