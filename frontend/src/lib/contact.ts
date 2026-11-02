import type { ContactFormData, ContactResponse } from "@shared/contact";

export interface ContactApiResult {
  success: boolean;
  message: string;
  statusCode: number;
  retryAfter?: number;
}

/**
 * Submit the contact form to the backend endpoint.
 * Handles HTTP 200, 400, 429, and 500 with descriptive user-facing messages.
 */
export async function submitContactForm(
  data: ContactFormData & { _hp?: string }
): Promise<ContactApiResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const statusCode = response.status;
    const retryHeader = response.headers.get("Retry-After");
    const parsedRetry = retryHeader ? parseInt(retryHeader, 10) : undefined;

    let body: Partial<ContactResponse & { retryAfter?: number }> = {};
    try {
      body = await response.json();
    } catch {
      // Non-JSON response
    }

    if (response.ok && body.success) {
      return {
        success: true,
        message:
          body.message ||
          "Message sent successfully! I'll get back to you soon.",
        statusCode,
      };
    }

    // Handle 429 Rate Limit
    if (statusCode === 429) {
      return {
        success: false,
        message:
          body.message ||
          "Too many submissions. Please try again after the indicated time.",
        statusCode,
        retryAfter: body.retryAfter || parsedRetry,
      };
    }

    // Handle 500 Delivery / Server Failure
    if (statusCode >= 500) {
      return {
        success: false,
        message:
          body.message ||
          "Unable to send your message right now. Please try again later.",
        statusCode,
      };
    }

    // Handle 400 Validation Error or other client errors
    return {
      success: false,
      message:
        body.message ||
        "Please check your entered details and try again.",
      statusCode,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "Unable to send your message right now. Please check your connection or try again later.",
      statusCode: 0,
    };
  }
}

