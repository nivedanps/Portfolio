import type { Request, Response } from "express";
import { getGithubStatus } from "../services/github.service";

export async function getGithubStatusHandler(req: Request, res: Response) {
  const force = req.query.force === "true";

  try {
    const data = await getGithubStatus(force);
    return res.json(data);
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Failed to fetch GitHub status",
      rateLimit: error.rateLimit,
    });
  }
}

