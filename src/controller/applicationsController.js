const Applications = require("../models/ApplicationsModal");
const Jobs = require("../models/JobModel");
const AppError = require("../utils/AppError");
const STATUSES = Applications.schema.path("status").enumValues;
const jobApplyController = async (req, res, next) => {
  try {
    const { resume, coverLetter } = req.body;
    const { jobId } = req.params;
    const userId = req.user.userId;
    const job = await Jobs.findById(jobId);
    if (!job) {
      throw new AppError("Job not found", 404);
    }
    const isApplicationsExist = await Applications.findOne({
      job: jobId,
      applicant: userId,
    });

    if (isApplicationsExist) {
      throw new AppError("You have already applied to this job", 409);
    }

    const application = await Applications.create({
      job: jobId,
      applicant: userId,
      resume,
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

const jobMeController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const applications = await Applications.find({ applicant: userId })
      .populate("job")
      .skip(skip)
      .limit(limit);
    const totalApplications = applications.length;
    const totalPages = Math.ceil(totalApplications / limit);

    res.status(200).json({
      code: 200,
      message: "applications fetch successfully",
      data: {
        applications,
        pagination: {
          totalApplications,
          currentPage: page,
          totalPages,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const viewApplicationsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const applications = await Applications.find({ job: jobId })
      .populate("applicant")
      .skip(skip)
      .limit(limit);

    const totalApplications = applications.length;
    const totalPages = Math.ceil(totalApplications / limit);

    res.status(200).json({
      code: 200,
      message: "applications fetch successfully",
      data: {
        applications,
        pagination: {
          totalApplications,
          currentPage: page,
          totalPages,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { appId, status } = req.params;
    if (!STATUSES.includes(status)) {
      throw new AppError(`Status must be one of: ${STATUSES.join(", ")}`, 400);
    }
    const application = await Applications.findById(appId);
    if (!application) {
      throw new AppError(`application not found`, 404);
    }

    const updateApplication = await Applications.findByIdAndUpdate(
      { _id: appId },
      { status },
      { new: true, runValidators: true },
    );
     
    res.status(200).json({
      code:200,
      success:true,
      message: "Application status updated",
      data:updateApplication
    })

  } catch (error) {
    next(error);
  }
};

module.exports = {
  jobApplyController,
  jobMeController,
  viewApplicationsForJob,
  updateJobStatus
};
