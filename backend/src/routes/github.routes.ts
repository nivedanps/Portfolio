import { Router } from "express";
import { getGithubStatusHandler } from "../controllers/github.controller";

const router = Router();

// GET /api/github/status
router.get("/status", getGithubStatusHandler);

export default router;

