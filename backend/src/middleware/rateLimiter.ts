import type { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const contactRateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically clean up expired entries
setInterval(() => {
  const now = Date.now();
  contactRateLimits.forEach((record, ip) => {
    if (now > record.resetTime) {
      contactRateLimits.delete(ip);
    }
  });
}, 5 * 60 * 1000).unref();

export function extractClientIp(req: Request): string {
  const raw = req.ip || req.socket.remoteAddress || "127.0.0.1";
  if (raw.startsWith("::ffff:")) {
    return raw.substring(7);
  }
  if (raw === "::1") {
    return "127.0.0.1";
  }
  return raw;
}

export function checkContactRateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientIp = extractClientIp(req);
  const now = Date.now();
  const limitRecord = contactRateLimits.get(clientIp);

  if (limitRecord) {
    if (now < limitRecord.resetTime) {
      if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSec = Math.max(
          1,
          Math.ceil((limitRecord.resetTime - now) / 1000)
        );
        const retryAfterMin = Math.ceil(retryAfterSec / 60);
        res.setHeader("Retry-After", String(retryAfterSec));
        return res.status(429).json({
          success: false,
          message:
            "Too many submissions. Please try again after the indicated time.",
          retryAfter: retryAfterSec,
          retryMinutes: retryAfterMin,
        });
      }
      limitRecord.count++;
    } else {
      contactRateLimits.set(clientIp, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    }
  } else {
    contactRateLimits.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
  }

  next();
}

/**
 * Rolls back a consumed rate-limit slot if the email dispatch failed on the server
 */
export function rollbackContactRateLimit(req: Request) {
  const clientIp = extractClientIp(req);
  const record = contactRateLimits.get(clientIp);
  if (record && record.count > 0) {
    record.count--;
  }
}

/**
 * Resets rate limit records (for testing & maintenance)
 */
export function resetContactRateLimits(ip?: string) {
  if (ip) {
    contactRateLimits.delete(ip);
  } else {
    contactRateLimits.clear();
  }
}

