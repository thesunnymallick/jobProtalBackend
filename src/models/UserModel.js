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
      validate:validator.isEmail()
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