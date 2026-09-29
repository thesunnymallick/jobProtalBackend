const User = require("../models/UserModel");
const registerValidator = require("../validator/registerValidator");
const AppError = require("../utils/AppError");

const registerController = async (req, res, next) => {
  try {
    const validator = await registerValidator(req.body);
    if (!validator.valid) {
      throw new AppError(validator.message, 400);
    }
    const { name, email, password, location } = req.body;
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      throw new AppError("User already exists!", 409);
    }
    await User.create({ name, email, password, location });

    res.status(201).json({
      code: 201,
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerController;
