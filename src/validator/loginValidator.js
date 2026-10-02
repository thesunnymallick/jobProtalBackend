const validator = require("validator");

const loginValidator = async (data) => {
  try {
    const email = String(data?.email ?? "").trim();
    const password = String(data?.password ?? "");
    if (validator.isEmpty(email)) {
      return { valid: false, message: "Email is required" };
    }
    if (!validator.isEmail(email)) {
      return { valid: false, message: "Please provide a valid email" };
    }

    if (validator.isEmpty(password)) {
      return { valid: false, message: "Password is required" };
    }
    if (!validator.isStrongPassword(password)) {
      return {
        valid: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and symbol",
      };
    }
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

module.exports=loginValidator
