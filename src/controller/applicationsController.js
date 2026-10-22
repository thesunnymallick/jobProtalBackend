const Applications = require("../models/ApplicationsModal");
const Jobs = require("../models/JobModel");
const AppError = require("../utils/AppError");
const STATUSES = Applications.schema.path("status").enumValues;
const jobApplyController = async (req, res, next) => {
  try {
    const { status, coverLetter } = req.body;
    const { jobId } = req.params;
    const userId = req.user.userId;
    if (status !== undefined && !STATUSES.includes(status)) {
      throw new AppError(`Status must be one of: ${STATUSES.join(", ")}`, 400);
    }
    const job = await Jobs.findById(jobId);
    if (!job) {
      throw new AppError("Job not found", 404);
    }
    const isApplicationsExist = await Applications.find({
      job: jobId,
      applicant: userId,
    });

    if (isApplicationsExist) {
      throw new AppError("You have already applied to this job", 409);
    }

    const application = await Applications.create({
      job: jobId,
      applicant: userId,
      status,
      coverLetter,
    });

    res.status(201).json({
      code: 201,
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { jobApplyController };
