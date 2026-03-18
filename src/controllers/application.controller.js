import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import Internship from "../models/internship.model.js";

export const apply = async (req, res) => {
  try {
    const { type, id } = req.params;

   
    if (type !== "job" && type !== "internship") {
      return res.status(400).json({
        success: false,
        message: "Type must be job or internship"
      });
    }


    let listing;
    if (type === "job") {
      listing = await Job.findById(id);
    } else {
      listing = await Internship.findById(id);
    }

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`
      });
    }

    if (type === "job") {
      const alreadyAppliedJob = await Application.findOne({
        applicant: req.user._id,
        job: id
      });


      if (alreadyAppliedJob) {
        return res.status(400).json({
          success: false,
          message: "You have already applied for this job"
        });
      }
    } else {
      const alreadyAppliedInternship = await Application.findOne({
        applicant: req.user._id,
        internship: id
      });


      if (alreadyAppliedInternship) {
        return res.status(400).json({
          success: false,
          message: "You have already applied for this internship"
        });
      }
    }


    let application;
    if (type === "job") {
      application = await Application.create({
        applicant: req.user._id,
        job: id
      });
    } else {
      application = await Application.create({
        applicant: req.user._id,
        internship: id
      });
    }

    return res.status(201).json({
      success: true,
      message: `Applied for ${type} successfully`,
      application
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// controller/function for get all aplication apllied bu candiadate

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job")
      .populate("internship");

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      applications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email username");

    return res.status(200).json({
      success: true,
      message: "Job applications fetched successfully",
      applications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateApplicationSatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if(["pending", "accepted", "rejected"].includes.status) {
      return res.status(400).json({
        message:"Status must be pending accepted or rejected"
      })
    }

    const application = await Application.findById(applicationId)

    if(!application){
      return res.status(404).json({
        status:false,
        message:"Application not found"
      })
    }

    // upsdate the status of application

    application.status = status
    await application.save()

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}