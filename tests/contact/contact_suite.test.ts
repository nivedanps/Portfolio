import assert from "node:assert";
import { createServer } from "http";
import nodemailer from "nodemailer";
import { createApp } from "../../backend/src/app";

async function runTestSuite() {
  console.log("==================================================");
  console.log("   PORTFOLIO CONTACT FORM COMPREHENSIVE TEST SUITE ");
  console.log("==================================================\n");

  // 1. Set up test environment variables
  process.env.GMAIL_USER = "nivedanps1234@gmail.com";
  process.env.GMAIL_APP_PASSWORD = "kmam kfsx qlpn sfic";
  process.env.CONTACT_RECEIVER_EMAIL = "nivedanps1234@gmail.com";
  process.env.NODE_ENV = "test";
  process.env.TRUST_PROXY = "true";

  // Track mocked emails sent
  const mockSentEmails: any[] = [];
  let shouldSimulateSmtpFailure = false;

  const originalCreateTransport = nodemailer.createTransport;
  (nodemailer as any).createTransport = (opts: any) => {
    return {
      sendMail: async (mailOpts: any) => {
        if (shouldSimulateSmtpFailure) {
          const authError: any = new Error(
            "535-5.7.8 Username and Password not accepted"
          );
          authError.responseCode = 535;
          throw authError;
        }
        mockSentEmails.push({ opts, mailOpts });
        return { messageId: `mock-msg-${Date.now()}` };
      },
      verify: async () => true,
    } as any;
  };

  // 2. Start an isolated test Express server
  const app = createApp();
  const httpServer = createServer(app);

  const TEST_PORT = 4999;
  await new Promise<void>((resolve) => httpServer.listen(TEST_PORT, resolve));
  const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

  try {
    // Helper to clear rate limits
    const resetLimits = async () => {
      await fetch(`${BASE_URL}/api/contact/reset-rate-limit`, {
        method: "POST",
      });
    };

    await resetLimits();

    // ----------------------------------------------------
    // TEST 1: Valid submission with mocked transport
    // ----------------------------------------------------
    console.log("Test 1: Valid submission and delivery via mocked transport...");
    const res1 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.1",
      },
      body: JSON.stringify({
        name: "Jane Developer",
        email: "jane@example.com",
        subject: "Senior Project Collaboration",
        message: "Hello! We love your portfolio work.",
      }),
    });
    assert.strictEqual(res1.status, 200, "Valid submission should return 200");
    const data1 = await res1.json();
    assert.strictEqual(data1.success, true);
    assert.strictEqual(
      data1.message,
      "Message sent successfully! I'll get back to you soon."
    );
    assert.strictEqual(
      mockSentEmails.length,
      1,
      "Mocked transport should have received 1 email"
    );

    const sentEmail = mockSentEmails[0].mailOpts;
    assert.strictEqual(sentEmail.to, "nivedanps1234@gmail.com");
    assert.strictEqual(sentEmail.replyTo, "jane@example.com");
    assert.strictEqual(
      sentEmail.subject,
      "New Portfolio Contact — Senior Project Collaboration"
    );
    assert(sentEmail.text.includes("Jane Developer"));
    assert(sentEmail.text.includes("jane@example.com"));
    assert(sentEmail.text.includes("Senior Project Collaboration"));
    console.log(
      "✓ Valid submission succeeded with correct headers & body (Reply-To:",
      sentEmail.replyTo,
      ")"
    );

    // ----------------------------------------------------
    // TEST 2: Invalid email address validation
    // ----------------------------------------------------
    console.log("\nTest 2: Invalid email rejection & no quota penalty...");
    const res2 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.2",
      },
      body: JSON.stringify({
        name: "Jane",
        email: "invalid-email-address",
        subject: "Hello",
        message: "Test message",
      }),
    });
    assert.strictEqual(res2.status, 400, "Invalid email should return 400");
    const data2 = await res2.json();
    assert.strictEqual(data2.success, false);
    assert.match(data2.message, /valid email/i);
    console.log("✓ Invalid email correctly rejected with 400:", data2.message);

    // ----------------------------------------------------
    // TEST 3: Empty required fields validation
    // ----------------------------------------------------
    console.log("\nTest 3: Empty required fields rejection...");
    const res3 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.3",
      },
      body: JSON.stringify({
        name: "",
        email: "",
        subject: "",
        message: "",
      }),
    });
    assert.strictEqual(res3.status, 400, "Empty payload should return 400");
    const data3 = await res3.json();
    assert.strictEqual(data3.success, false);
    console.log("✓ Empty fields rejected with 400:", data3.message);

    // ----------------------------------------------------
    // TEST 4: Honeypot spam submission
    // ----------------------------------------------------
    console.log("\nTest 4: Honeypot spam bot trapping...");
    const preCount = mockSentEmails.length;
    const res4 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.4",
      },
      body: JSON.stringify({
        name: "Bot Spammer",
        email: "spambot@example.com",
        subject: "Spam Offer",
        message: "Buy products now!",
        _hp: "I am a malicious bot",
      }),
    });
    assert.strictEqual(res4.status, 200, "Honeypot should return silent 200");
    const data4 = await res4.json();
    assert.strictEqual(data4.success, true);
    assert.strictEqual(
      mockSentEmails.length,
      preCount,
      "No email should be dispatched for honeypot spam"
    );
    console.log("✓ Spambot caught by honeypot; no email dispatched");

    // ----------------------------------------------------
    // TEST 5 & 6: Five allowed requests + Sixth returns 429 with Retry-After
    // ----------------------------------------------------
    console.log(
      "\nTest 5 & 6: Five allowed submissions and 6th triggers 429..."
    );
    const rateLimitIp = "203.0.113.50";
    for (let i = 1; i <= 5; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": rateLimitIp,
        },
        body: JSON.stringify({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          subject: `Inquiry ${i}`,
          message: `This is legitimate message number ${i}`,
        }),
      });
      assert.strictEqual(
        res.status,
        200,
        `Request ${i} of 5 should succeed with 200`
      );
    }
    console.log("✓ First 5 requests from IP succeeded (quota limit reached)");

    // 6th request must be rejected with 429
    const res6 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": rateLimitIp,
      },
      body: JSON.stringify({
        name: "User 6",
        email: "user6@example.com",
        subject: "Inquiry 6",
        message: "This should be blocked by rate limiting.",
      }),
    });
    assert.strictEqual(res6.status, 429, "6th request must return 429");
    const data6 = await res6.json();
    assert.strictEqual(data6.success, false);
    assert.strictEqual(
      data6.message,
      "Too many submissions. Please try again after the indicated time."
    );
    const retryAfterHeader = res6.headers.get("Retry-After");
    assert(retryAfterHeader, "429 response must contain Retry-After header");
    assert(Number(retryAfterHeader) > 0, "Retry-After must be positive seconds");
    console.log(
      `✓ 6th request correctly blocked with 429 (Retry-After: ${retryAfterHeader}s)`
    );

    // ----------------------------------------------------
    // TEST 7: Rate-limit reset
    // ----------------------------------------------------
    console.log("\nTest 7: Rate-limit reset allows new submissions...");
    await resetLimits();
    const res7 = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": rateLimitIp,
      },
      body: JSON.stringify({
        name: "User After Reset",
        email: "reset@example.com",
        subject: "Post Reset Message",
        message: "Rate limit was reset, this should now succeed.",
      }),
    });
    assert.strictEqual(
      res7.status,
      200,
      "Request after reset should succeed with 200"
    );
    console.log("✓ Submissions accepted again following rate-limit reset");

    // ----------------------------------------------------
    // TEST 8 & 9: SMTP delivery failure handling & rollback of quota
    // ----------------------------------------------------
    console.log(
      "\nTest 8 & 9: SMTP authentication failure handling and quota rollback..."
    );
    shouldSimulateSmtpFailure = true;
    const failureIp = "203.0.113.99";

    const resFailure = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": failureIp,
      },
      body: JSON.stringify({
        name: "Visitor During Outage",
        email: "visitor@example.com",
        subject: "Important Outreach",
        message: "Attempt during simulated SMTP error",
      }),
    });
    assert.strictEqual(resFailure.status, 500, "SMTP failure should return 500");
    const dataFailure = await resFailure.json();
    assert.strictEqual(dataFailure.success, false);
    assert.strictEqual(
      dataFailure.message,
      "Unable to send your message right now. Please try again later."
    );

    // Now restore SMTP and ensure the user's IP quota was NOT penalized
    shouldSimulateSmtpFailure = false;
    const resRecovered = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": failureIp,
      },
      body: JSON.stringify({
        name: "Visitor Recovered",
        email: "visitor@example.com",
        subject: "Important Outreach Recovered",
        message: "Attempt after SMTP recovery",
      }),
    });
    assert.strictEqual(
      resRecovered.status,
      200,
      "Quota rollback ensures visitor can retry upon SMTP recovery"
    );
    console.log(
      "✓ SMTP error returned clean 500; quota was safely rolled back and retry succeeded"
    );

    // ----------------------------------------------------
    // TEST 10: Security audit - No credentials or stack trace leaked
    // ----------------------------------------------------
    console.log(
      "\nTest 10: Security audit for credential leakage in all responses..."
    );
    const sampleBodies = [
      JSON.stringify(data1),
      JSON.stringify(data2),
      JSON.stringify(data3),
      JSON.stringify(data4),
      JSON.stringify(data6),
      JSON.stringify(dataFailure),
    ];
    for (const bodyStr of sampleBodies) {
      assert(!bodyStr.includes("kmam"), "App password must not leak");
      assert(!bodyStr.includes("qlpn"), "App password fragment must not leak");
      assert(
        !bodyStr.includes("GMAIL_APP_PASSWORD"),
        "Env var names must not leak"
      );
      assert(!bodyStr.includes("at Object."), "Stack trace must not leak");
    }
    console.log(
      "✓ Zero credential fragments or stack traces found in any API responses"
    );

    console.log("\n==================================================");
    console.log("   ALL 10 AUTOMATED TEST SCENARIOS PASSED 100%!   ");
    console.log("==================================================");
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    await new Promise<void>((resolve) => httpServer.close(() => resolve()));
  }
}

runTestSuite().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});

