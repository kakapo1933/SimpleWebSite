import { Router } from "express";
import { organizationController } from "../controllers/organizationController";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

// Get all organizations
router.get("/", catchAsync(organizationController.getOrganizations))

// Search for organizations
router.get("/search", catchAsync(organizationController.searchOrganizations));

export default router;