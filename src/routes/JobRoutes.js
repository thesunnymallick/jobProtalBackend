const express = require("express");
const {
  createJobController,
  allJobsController,
  editJobController,
  deleteJobController,
  jobStatsController,
} = require("../controller/jobController");
const { userAuth, authorizeRoles } = require("../middleware/authMiddleware");

const jobRouter = express.Router();

// Any logged-in user can browse jobs; only admins can manage them
jobRouter.post("/create", userAuth, authorizeRoles("admin"), createJobController);
jobRouter.get("/all", userAuth, allJobsController);
jobRouter.put("/edit/:id", userAuth, authorizeRoles("admin"), editJobController);
jobRouter.delete("/delete/:id", userAuth, authorizeRoles("admin"), deleteJobController);
jobRouter.get("/job-stats", userAuth, authorizeRoles("admin"), jobStatsController)


module.exports = jobRouter;
