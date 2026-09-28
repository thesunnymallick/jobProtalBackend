const express = require("express");
const {
  createJobController,
  allJobsController,
} = require("../controller/jobController");

const jobRouter = express.Router();

jobRouter.post("/create", createJobController);
jobRouter.get("/all", allJobsController);

module.exports = jobRouter;
