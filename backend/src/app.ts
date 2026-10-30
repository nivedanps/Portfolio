import express, { type Express } from "express";
import { config } from "./config";
import { requestLogger } from "./middleware/logging";
import { errorHandler } from "./middleware/errorHandler";
import apiRoutes from "./routes";

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

export function createApp(): Express {
  const app = express();

  // Configure proxy trust based on environment
  if (config.trustProxy) {
    const val = config.trustProxy;
    app.set(
      "trust proxy",
      val === "true" ? true : isNaN(Number(val)) ? val : Number(val)
    );
  } else if (config.isProduction) {
    app.set("trust proxy", 1);
  } else {
    app.set("trust proxy", false);
  }

  // Parse JSON and URL-encoded bodies
  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    })
  );
  app.use(express.urlencoded({ extended: false }));

  // Request logger for API calls
  app.use(requestLogger);

  // Mount API endpoints
  app.use("/api", apiRoutes);

  // Centralized error handling
  app.use(errorHandler);

  return app;
}

