import express from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', verifyToken, loginUser);
router.post("/logout", verifyToken, logoutUser)


export default router;