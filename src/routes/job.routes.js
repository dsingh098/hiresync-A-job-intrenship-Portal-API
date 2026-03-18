import express from "express";
import { 
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob 
} from "../controllers/job.controller.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes — anyone can access
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes — only company can access
router.post("/", verifyToken, authorizeRoles("company"), createJob);
router.put("/:id", verifyToken, authorizeRoles("company"), updateJob);
router.delete("/:id", verifyToken, authorizeRoles("company"), deleteJob);

export default router;