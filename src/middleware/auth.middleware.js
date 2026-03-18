import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

// Token verify
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No token found, please login" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User does not exist" 
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Token is invalid or expired" 
    });
  }
};

// Role check
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const isAllowed = roles.includes(req.user.role);

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action"
      });
    }

    next();
  };
};