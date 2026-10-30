import assert from "node:assert";
import nodemailer from "nodemailer";
import { contactFormSchema } from "../../shared/schemas/contact.schema";
import { sendContactEmail } from "../../backend/src/services/email.service";

async function testEmailModule() {
  console.log("=== RUNNING EMAIL UNIT TEST SUITE ===\n");

  // 1. Verify Zod Schema validation
  console.log("Test 1: Validating schema edge cases...");
  const validData = {
    name: "Alex Rivera",
    email: "alex@example.com",
    subject: "Hiring Opportunity",
    message: "We loved your portfolio and would like to chat.",
  };
  const parseResult = contactFormSchema.safeParse(validData);
  assert.strictEqual(parseResult.success, true);
  console.log("✓ Zod schema validated clean contact data");

  // 2. Test Nodemailer Transporter Configuration requirements
  console.log("\nTest 2: Verifying Gmail SMTP configuration settings...");
  process.env.GMAIL_USER = "testuser@gmail.com";
  process.env.GMAIL_APP_PASSWORD = "test-app-password";
  process.env.CONTACT_RECEIVER_EMAIL = "nivedanps1234@gmail.com";

  let sentMailOptions: any = null;
  const originalCreateTransport = nodemailer.createTransport;
  (nodemailer as any).createTransport = (opts: any) => {
    assert.strictEqual(opts.host, "smtp.gmail.com", "Host must be smtp.gmail.com");
    assert.strictEqual(opts.port, 465, "Port must be 465");
    assert.strictEqual(opts.secure, true, "Secure must be true");
    assert.strictEqual(opts.auth.user, "testuser@gmail.com");
    assert.strictEqual(opts.auth.pass, "test-app-password");

    return {
      sendMail: async (mailOpts: any) => {
        sentMailOptions = mailOpts;
        return { messageId: "mock-msg-12345" };
      },
    } as any;
  };

  try {
    await sendContactEmail({
      name: "Alex Rivera",
      email: "alex@example.com",
      subject: "Hiring Opportunity",
      message:
        "We loved your portfolio <script>alert(1)</script> and would like to chat.",
    });

    console.log(
      "✓ sendContactEmail executed successfully with mocked SMTP transporter"
    );

    // Verify sent mail properties
    console.log("\nTest 3: Verifying email attributes...");
    assert.strictEqual(
      sentMailOptions.subject,
      "New Portfolio Contact — Hiring Opportunity",
      "Subject must follow format 'New Portfolio Contact — [Visitor's Subject]'"
    );
    assert.strictEqual(
      sentMailOptions.to,
      "nivedanps1234@gmail.com",
      "Recipient must match CONTACT_RECEIVER_EMAIL or default"
    );
    assert.strictEqual(
      sentMailOptions.replyTo,
      "alex@example.com",
      "Reply-To must be set to the visitor's email"
    );
    assert(
      sentMailOptions.from.includes("testuser@gmail.com"),
      "From must include the GMAIL_USER"
    );

    // Verify Body contains Name, Email, Subject, Message, Timestamp
    assert(
      sentMailOptions.text.includes("Alex Rivera"),
      "Body must contain visitor name"
    );
    assert(
      sentMailOptions.text.includes("alex@example.com"),
      "Body must contain visitor email"
    );
    assert(
      sentMailOptions.text.includes("Hiring Opportunity"),
      "Body must contain subject"
    );
    assert(
      sentMailOptions.text.includes("We loved your portfolio"),
      "Body must contain message"
    );
    assert(
      sentMailOptions.text.includes("Submitted:"),
      "Body must contain timestamp"
    );

    // Verify HTML escaping prevents XSS injection
    assert(
      !sentMailOptions.html.includes("<script>"),
      "HTML body must escape HTML entities"
    );
    assert(
      sentMailOptions.html.includes("&lt;script&gt;"),
      "Script tag must be safely escaped"
    );

    console.log("✓ Email Subject matches: 'New Portfolio Contact — Hiring Opportunity'");
    console.log("✓ Reply-To set to visitor: 'alex@example.com'");
    console.log("✓ Recipient set to: 'nivedanps1234@gmail.com'");
    console.log(
      "✓ Body contains all 5 required elements (Name, Email, Subject, Message, Timestamp)"
    );
    console.log("✓ HTML escaping confirmed (XSS safe)");
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    delete process.env.CONTACT_RECEIVER_EMAIL;
  }

  console.log("\n=== ALL EMAIL UNIT TESTS PASSED! ===");
}

testEmailModule().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

