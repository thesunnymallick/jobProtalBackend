
const express=require("express");
const { userAuth } = require("../middleware/authMiddleware");
const { jobApplyController } = require("../controller/applicationsController");
// const {}=require("../")

const applicationsRoute=express.Router();


applicationsRoute.post("/apply/:jobId", userAuth, jobApplyController);


module.exports=applicationsRoute