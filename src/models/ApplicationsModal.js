const mongoose=require("mongoose");

const ApplicationSchema=mongoose.Schema({
    job:{
        type:mongoose.Types.ObjectId,
        ref:"Jobs",
        required:[true, "Job id is required"]
    },
    applicant:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, "user id is required"]
    },
    status:{
        type:String,
        enum:["applied", "reviewed", "interview", "rejected", "hired"],
        default:"applied",
    },
    resume:{
        type:String,
         required:[true,  "resume is required"],
    },
    coverLetter:{
        type:String,
         maxlength: 150,
    },
}, {timestamps:true})

const Applications=mongoose.model("Applications", ApplicationSchema)


module.exports=Applications