import Internship from '../models/internship.model.js';

//  function/controller to create a new internship

export const createInternship = async (req, res) => {
  try {
    const { title, stipend, duration, description, skills, isPaid } = req.body;

    // Required fields check
    if (!title || !duration || !description) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, duration and description are required" 
      });
    }

    const internship = await Internship.create({
      title,
      stipend,
      duration,
      description,
      skills,
      isPaid,
      company: req.user.companyName,       // req.user se
      location: req.user.companyLocation,  // req.user se
      postedBy: req.user._id,              // req.user se
    });

    return res.status(201).json({ 
      success: true, 
      message: "Internship created successfully", 
      internship
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// function/contoller for get all internships

export const getInternships = async (req, res) => {

  try {
    const { title, location, isPaid, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };

    if (location) filter.location = { $regex: location, $options: "i" };
    
    if (isPaid !== undefined) filter.isPaid = isPaid === "true"; // "true" string → boolean

    const internship = await Internship.find(filter).skip(skip).limit(Number(limit));
    const totalInternship = await Internship.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalInternship,
      currentPage: Number(page),
      totalPages: Math.ceil(totalInternship / limit),
      internship
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// function/controller for get internship by id
export const getinternshipById = async (req, res) => {
    try {
        const {id} = req.params

        const internship = await Internship.findById(id)

        if(!internship){
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Internship fetched successfully",
            internship
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// function/controller for update internship by id 

export const updateInternship = async (req, res) => {
    try {
        const {id} = req.params

        const internship = await Internship.findByIdAndUpdate(id, req.body, { new: true })

        if(!iternship){
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Internship updated successfully",
            internship: iternship
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// function/controller for delete internship 

export const deleteInternship = async (req, res) => {
    try {
        const {id} = req.params

        const internship = await Internship.findByIdAndDelete(id)


    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

        return res.status(200).json({
            success: true,
            message: 'Internship deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })      
    }
}