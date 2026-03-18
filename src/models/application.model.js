import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship"
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
   resume: {
    type: String,  
    default: null  
   }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;