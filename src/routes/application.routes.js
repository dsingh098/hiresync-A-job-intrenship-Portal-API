import express from "express";
import { 
  apply, 
  getMyApplications, 
  getJobApplications,
  updateApplicationSatus 
} from "../controllers/application.controller.js";

import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";

import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/:type/:id", verifyToken, authorizeRoles("candidate"), upload.single("resume"), apply);



router.post("/:type/:id", verifyToken, authorizeRoles("candidate"), apply);

router.get("/my", verifyToken, authorizeRoles("candidate"), getMyApplications);

router.get("/job/:jobId", verifyToken, authorizeRoles("company"), getJobApplications);

router.put("/:applicationId/status", verifyToken, authorizeRoles("company"), updateApplicationSatus);

export default router;