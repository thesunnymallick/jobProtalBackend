const User = require("../models/UserModel");
const registerValidator = require("../validator/registerValidator");
const AppError = require("../utils/AppError");
const loginValidator = require("../validator/loginValidator");

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
    const user = await User.create({ name, email, password, location });
    const token=user.createJWT()

    res.status(201).json({
      code: 201,
      success: true,
      message: "User register successfully",
      user: {
        name: user.name,
        email: user.email,
        location:user.location
      },
      token

    });
  } catch (error) {
    next(error);
  }
};


const loginController=async(req, res, next)=>{
  try {
   const validator=await loginValidator(req.body)
    if (!validator.valid) {
      throw new AppError(validator.message, 400);
    }
    const {email, password}=req.body;
     
    const user=await User.findOne({email}).select("+password");
     if(!user){
      throw new AppError("Invalid email or password!", 400)
     }
    
     const isPasswordMatched=await user.comparePassword(password);
     if(!isPasswordMatched){
      throw new AppError("Invalid email or password!", 400)
     }
     const token=user.createJWT()
     user.password = undefined;
     res.status(200).json({
      code: 200,
      success: true,
      message: "User login successfully",
      user,
      token
    });
  } catch (error) {
    next(error)
  }
}

module.exports = { registerController, loginController };
