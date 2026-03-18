import Job  from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const { title, salary, description, skills, jobtype } = req.body;

    if (!title || !description || !skills || !jobtype) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const job = await Job.create({
      title,
      salary,
      description,
      skills,
      jobtype,
      company: req.user.companyName,       // req.user 
      location: req.user.companyLocation,  // req.user 
      postedBy: req.user._id,              // req.user 
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all jobs controller/function with pagination and search functionality  

export const getAllJobs = async (req, res) => {
  try {
    const { title, location, jobType, page = 1, limit = 10 } = req.query;

    // Filter object
    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (jobType) filter.jobType = jobType;

    // Pagination
    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// get job by Id controller/function

export const getJobById = async (req, res) => {
    try {
        const {id} = req.params

        const job = await Job.findById(id)

        if(!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        return res.status(200).json({ success: true, message: "Job fetched successfully", job });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// function/controller to update job by Id
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Job updated successfully", 
      job 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// function/controller for delete job 

export const deleteJob = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) {
            return res.status(400).json({ success: false, message: "Job Id is required" });
        }

        const job = await Job.findByIdAndDelete(id)

        if(!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        return res.status(200).json({ success: true, message: "Job deleted successfully" });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}