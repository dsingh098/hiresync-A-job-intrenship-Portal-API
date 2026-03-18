import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
    trim: true
  },
  company: {
    type: String,
    required: [true, "Company required"],
  },
  location: {
    type: String,
    required: [true, "Location required"]
  },
  stipend: {
    type: Number // Monthly stipend
  },
  duration: {
    type: String, // "3 months", "6 months"
    required: [true, "Duration required"]
  },
  description: {
    type: String,
    required: [true, "Description required"],
  },
  skills: [String],
  isPaid: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;