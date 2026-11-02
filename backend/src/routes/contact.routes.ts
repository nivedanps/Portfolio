import { Router } from "express";
import { checkContactRateLimit } from "../middleware/rateLimiter";
import {
  submitContact,
  resetRateLimitsHandler,
} from "../controllers/contact.controller";
import { config } from "../config";

const router = Router();

// POST /api/contact - with rate limiting and validation
router.post("/", checkContactRateLimit, submitContact);

// GET /api/contact - method not allowed handler
router.get("/", (_req, res) => {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed. Use POST to submit the contact form.",
  });
});

// POST /api/contact/reset-rate-limit - development/testing utility
if (!config.isProduction) {
  router.post("/reset-rate-limit", resetRateLimitsHandler);
}

export default router;

