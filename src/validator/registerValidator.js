const validator = require("validator");

const registerValidator = async (data) => {
  try {
    const name = String(data?.name ?? "").trim();
    const email = String(data?.email ?? "").trim();
    const password = String(data?.password ?? "");
    const location = data?.location;

    if (validator.isEmpty(name)) {
      return { valid: false, message: "Name is required" };
    }
    if (!validator.isLength(name, { min: 2, max: 50 })) {
      return { valid: false, message: "Name must be between 2 and 50 characters" };
    }
    if (!validator.isAlpha(name, "en-US", { ignore: " " })) {
      return { valid: false, message: "Name can only contain letters and spaces" };
    }

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

    if (location !== undefined && validator.isEmpty(String(location).trim())) {
      return { valid: false, message: "Location cannot be empty" };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

module.exports = registerValidator;
