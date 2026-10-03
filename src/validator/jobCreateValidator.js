const Job = require("../models/JobModel");

const WORK_TYPES = Job.schema.path("workType").enumValues;
const STATUSES = Job.schema.path("status").enumValues;

const jobCreateValidator = async (data) => {
  try {
    const { title, company, description, location, salary, skills, workType, status } = data

    if (!title || typeof title !== "string") {
      return { valid: false, message: "Title is required" };
    }

    if (!company || typeof company !== "string") {
      return { valid: false, message: "Company name is required" };
    }

    if (!description || typeof description !== "string") {
      return { valid: false, message: "Description is required" };
    }
    if (!location || typeof location !== "string") {
      return { valid: false, message: "location is. required" };
    }
    if (!salary) {
      return { valid: false, message: "Salary is required" };
    }
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return { valid: false, message: "At least one skill is required" };
    }
    if (workType !== undefined && !WORK_TYPES.includes(workType)) {
      return { valid: false, message: `Work type must be one of: ${WORK_TYPES.join(", ")}` };
    }
    if (status !== undefined && !STATUSES.includes(status)) {
      return { valid: false, message: `Status must be one of: ${STATUSES.join(", ")}` };
    }
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

module.exports=jobCreateValidator
