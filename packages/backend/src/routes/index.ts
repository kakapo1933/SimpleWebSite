import { Router } from "express";
import organizations from "./organizations";

const router = Router();
const v1Router = Router();

// set up prefix for v1
router.use("/api/v1", v1Router);

v1Router.use("/organizations", organizations);

export default router;