import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["candidate", "company"],
    default: "candidate",
  },
  companyName: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;