const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT =require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      select: false,
    },
    location: {
      type: String,
      default: "Delhi",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createJWT=function (){
   return JWT.sign({userId:this._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
}

const User = mongoose.model("User", userSchema);

module.exports = User;
