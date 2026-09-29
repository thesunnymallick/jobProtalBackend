const Job = require("../models/JobModel");
const jobCreateValidator = require("../validator/jobCreateValidator");
const jobUpdateValidator = require("../validator/jobUpdateValidator");
const AppError = require("../utils/AppError");

const createJobController = async (req, res, next) => {
  try {
    const validator = await jobCreateValidator(req.body);
    if (!validator.valid) {
      throw new AppError(validator.message, 400);
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
    next(error);
  }
};

const allJobsController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * 10;
    const allJobs = await Job.find({}).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments({});
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).json({
      success: true,
      code: 200,
      message: "all jobs fetch successfully",
      data: allJobs,
      pagination: {
        currentPage: page,
        limit,
        totalJobs,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editJobController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validator = await jobUpdateValidator(req.body);
    if (!validator.valid) {
      throw new AppError(validator.message, 400);
    }

    const { title, company, description, location, salary, skills } = req.body;
    const updateData = {
      title,
      company,
      description,
      location,
      salary,
      skills,
    };
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    const job = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobController,
  allJobsController,
  editJobController,
  deleteJobController,
};
