import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/auth.model.js";


// register user function/controller

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role, companyName, companyLocation } = req.body;
   

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,              
      companyName,       
      companyLocation,   
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,              
        companyName: user.companyName 
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// login user function/controller

export const loginUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if ((!username && !email) || !password) {
            return res.status(400).json({ message: "Username or email and password are required" });
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// logout user function/controller

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ message: "User logged out successfully" });
};  
