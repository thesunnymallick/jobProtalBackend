
const express=require("express");
const { userAuth, authorizeRoles } = require("../middleware/authMiddleware");
const { jobApplyController, jobMeController, viewApplicationsForJob, updateJobStatus } = require("../controller/applicationsController");
// const {}=require("../")

const applicationsRoute=express.Router();


applicationsRoute.post("/apply/:jobId", userAuth, jobApplyController);

applicationsRoute.get("/me", userAuth, jobMeController)

applicationsRoute.get("/job/:jobId", userAuth, authorizeRoles("admin"), viewApplicationsForJob)

applicationsRoute.patch("/:appId/:status", userAuth, authorizeRoles("admin"), updateJobStatus)
module.exports=applicationsRoute 