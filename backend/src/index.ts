import { createServer } from "http";
import { createApp } from "./app";
import { config } from "./config";
import { log } from "./middleware/logging";

(async () => {
  const app = createApp();
  const httpServer = createServer(app);

  if (config.isProduction) {
    const { serveStatic } = await import("./middleware/static");
    serveStatic(app);
  } else {
    const { setupVite } = await import("./middleware/vite");
    await setupVite(httpServer, app);
  }

  httpServer.listen(
    {
      port: config.port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${config.port}`);
    }
  );
})();

