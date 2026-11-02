import { strict as assert } from "assert";
import { createServer } from "http";
import app from "../../api/index";

async function runVercelApiSuite() {
  console.log("==================================================");
  console.log("   VERCEL SERVERLESS FUNCTION HANDLER TEST SUITE  ");
  console.log("==================================================");

  assert.ok(typeof app === "function", "api/index must export a valid callable Express application");
  console.log("✓ api/index default export is a valid Express application function");

  // Spin up an ephemeral HTTP server around the exported app to test requests
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to get server port");
  }
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    // 1. Test POST /api/contact validation
    console.log("Test 1: Testing POST /api/contact validation...");
    const res1 = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(res1.status, 400, "Empty payload should return HTTP 400");
    const json1 = await res1.json();
    assert.equal(json1.success, false, "Response should have success: false");
    console.log("✓ POST /api/contact validation returned HTTP 400 as expected");

    // 2. Test POST /contact (direct rewritten route without /api prefix)
    console.log("Test 2: Testing POST /contact route...");
    const res2 = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(res2.status, 400, "Empty payload to /contact should return HTTP 400");
    console.log("✓ POST /contact returned HTTP 400 as expected");

    // 3. Test GET /api/contact (expected method handling: 405 Method Not Allowed, not a crash)
    console.log("Test 3: Testing GET /api/contact method handling...");
    const resGetContact = await fetch(`${baseUrl}/api/contact`);
    assert.equal(resGetContact.status, 405, "GET /api/contact should return HTTP 405 Method Not Allowed");
    const jsonGetContact = await resGetContact.json();
    assert.equal(jsonGetContact.success, false, "GET /api/contact response should indicate failure");
    console.log("✓ GET /api/contact returned HTTP 405 Method Not Allowed as expected");

    // 4. Test POST /api/contact with valid mocked input
    console.log("Test 4: Testing POST /api/contact with valid mocked input...");
    const resValidContact = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Visitor",
        email: "visitor@example.com",
        subject: "Collaboration Request",
        message: "Hello! This is an automated test inquiry.",
      }),
    });
    // In test environment, if SMTP fails or succeeds, it either returns 200 or 500 (not 400)
    assert.ok(
      resValidContact.status === 200 || resValidContact.status === 500,
      `Valid contact should pass schema validation, returned: ${resValidContact.status}`
    );
    console.log("✓ POST /api/contact with valid input passed schema validation");

    // 5. Test Honeypot trap on /api/contact
    console.log("Test 5: Testing honeypot bot trap...");
    const res3 = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot",
        email: "bot@spam.com",
        subject: "Spam",
        message: "Spam message",
        _hp: "honeypot-value",
      }),
    });
    assert.equal(res3.status, 200, "Honeypot request should return HTTP 200");
    const json3 = await res3.json();
    assert.equal(json3.success, true, "Honeypot response should indicate success to trap bot");
    console.log("✓ Honeypot correctly trapped spam bot with silent success response");

    // 6. Test GET /api/github/status
    console.log("Test 6: Testing GET /api/github/status endpoint...");
    const res4 = await fetch(`${baseUrl}/api/github/status`);
    assert.equal(res4.status, 200, "GitHub status should return HTTP 200");
    const json4 = await res4.json();
    assert.equal(json4.username, "nivedanps", "GitHub username should match nivedanps");
    console.log("✓ GET /api/github/status responded with status 200 and valid JSON");

    console.log("==================================================");
    console.log("   ALL VERCEL FUNCTION TESTS PASSED 100%!        ");
    console.log("==================================================");
  } finally {
    server.close();
  }
}

runVercelApiSuite().catch((err) => {
  console.error("Vercel API test suite failed:", err);
  process.exit(1);
});

