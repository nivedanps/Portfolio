import { createApp } from "../backend/src/app";

// Initialize the Express application
const app = createApp();

// Export the Express app as the default handler for Vercel Serverless Functions
export default app;
