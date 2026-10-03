const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
            minlength: 5,
            maxlength: 50,
        },
        company: {
            type: String,
            required: [true, "Company Name is required"],
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        location: {
            type: String,
            required: [true, "location is required"],
            trim: true,
        },
        salary: {
            type: String,
            required: [true, "Salary is required"],
        },
        skills: {
            type: [String],
            required: [true, "Skills is required"],
            validate: {
                validator: function (skills) {
                   if(!skills.every((skills)=>skills.trim().length!==0)){
                    return false
                   }else{
                    return true
                   }
                },
                message: `Skill cannot be empty`
            }
        },
        workType:{
            type:String,
            required: [true, "Work type is required"],
            enum:["full-time", "part-time", "internship", "contract"],
            default:"full-time",
        },
        status:{
         type:String,
         required:[true, "Status is required"],
         enum:["pending", "rejected", "interview"],
         default:"pending"
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }

    },
    { timestamps: true },
);

const Job = mongoose.model("Jobs", JobSchema);

module.exports = Job;
