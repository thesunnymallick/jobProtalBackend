const Job = require("../models/JobModel");
const jobCreateValidator = require("../validator/jobCreateValidator");

const createJobController = async (req, res) => {
  try {
    const validator = await jobCreateValidator(req.body);
    if (!validator.valid) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: validator.message,
      });
    }
    const { title, company, description, location, salary, skills } = req.body;
    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      skills,
    });
    res.status(201).json({
      code: 201,
      success: true,
      message: "Job Create successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allJobsController = async (req, res) => {
  try {
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) ||10;
    const skip= (page-1) * 10
    const allJobs = await Job.find({}).skip(skip).limit(limit);
    const totalJobs=await Job.countDocuments({});
    const totalPages=Math.ceil(totalJobs/limit)

    res.status(200).json({
        success:true,
        code:200,
        message:'all jobs fetch successfully',
        data:allJobs,
        pagination:{
         currentPage:page,
         limit,
         totalJobs,
         totalPages,
         hasNextPage:page < totalPages,
         hasPreviousPage:page>1
        }
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      code: 501,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createJobController, allJobsController };
