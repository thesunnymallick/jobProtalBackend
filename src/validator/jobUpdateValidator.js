const jobUpdateValidator = async (data) => {
  try {
    const { title, company, description, location, salary, skills } = data;

    if (
      title === undefined &&
      company === undefined &&
      description === undefined &&
      location === undefined &&
      salary === undefined &&
      skills === undefined
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

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

module.exports = jobUpdateValidator;
