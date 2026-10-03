const Job = require("../models/JobModel");

const WORK_TYPES = Job.schema.path("workType").enumValues;
const STATUSES = Job.schema.path("status").enumValues;

const jobUpdateValidator = async (data) => {
  try {
    const { title, company, description, location, salary, skills, workType, status } = data;

    if (
      title === undefined &&
      company === undefined &&
      description === undefined &&
      location === undefined &&
      salary === undefined &&
      skills === undefined &&
      workType === undefined &&
      status === undefined
    ) {
      return { valid: false, message: "At least one field is required to update" };
    }

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return { valid: false, message: "Title must be a non-empty string" };
    }

    if (company !== undefined && (typeof company !== "string" || !company.trim())) {
      return { valid: false, message: "Company must be a non-empty string" };
    }

    if (description !== undefined && (typeof description !== "string" || !description.trim())) {
      return { valid: false, message: "Description must be a non-empty string" };
    }

    if (location !== undefined && (typeof location !== "string" || !location.trim())) {
      return { valid: false, message: "Location must be a non-empty string" };
    }

    if (salary !== undefined && !salary) {
      return { valid: false, message: "Salary must not be empty" };
    }

    if (
      skills !== undefined &&
      (!Array.isArray(skills) || skills.length === 0 || !skills.every((skill) => skill.trim().length !== 0))
    ) {
      return { valid: false, message: "At least one non-empty skill is required" };
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

module.exports = jobUpdateValidator;
