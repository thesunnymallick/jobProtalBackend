const express = require("express");
const {
  createJobController,
  allJobsController,
  editJobController,
  deleteJobController,
} = require("../controller/jobController");

const jobRouter = express.Router();

jobRouter.post("/create", createJobController);
jobRouter.get("/all", allJobsController);
jobRouter.put("/edit/:id", editJobController);
jobRouter.delete("/delete/:id", deleteJobController);

module.exports = jobRouter;
