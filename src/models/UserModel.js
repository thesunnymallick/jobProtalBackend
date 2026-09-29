 const mongoose=require("mongoose");
 const validator = require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true,
    },
    email:{
      type:String,
      required:[true, "Email is required"],
      trim:true,
      unique:true,
      lowercase:true,
      validate:[validator.isEmail, "Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        trim:true,
    },
    location:{
        type:String,
        default: "Delhi",
    }
}, {timestamps:true})

const User=mongoose.model("User", userSchema)

module.exports=User