import { createApp } from "./app";

// Initialize the Express application
export const app = createApp();

// Export default handler function for Vercel Serverless Functions
export default function handler(req: any, res: any) {
  return app(req, res);
}
