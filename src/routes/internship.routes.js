import express from 'express';
import { 
  createInternship, 
  deleteInternship, 
  getInternships, 
  getinternshipById, 
  updateInternship 
} from '../controllers/internship.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes — anyone can access
router.get("/", getInternships);
router.get("/:id", getinternshipById);

// Protected routes — only company
router.post("/", verifyToken, authorizeRoles("company"), createInternship);
router.put("/:id", verifyToken, authorizeRoles("company"), updateInternship);
router.delete("/:id", verifyToken, authorizeRoles("company"), deleteInternship);

export default router;