import { Router } from "express";
import contactRoutes from "./contact.routes";
import githubRoutes from "./github.routes";

const apiRouter = Router();

apiRouter.use("/contact", contactRoutes);
apiRouter.use("/github", githubRoutes);

export default apiRouter;

