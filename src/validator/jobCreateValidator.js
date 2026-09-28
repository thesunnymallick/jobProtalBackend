const jobCreateValidator = async (data) => {
  try {
    const { title, company, description, location, salary, skills } = data

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
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

module.exports=jobCreateValidator
