const express = require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const morgan=require("morgan");
const mongoDBConnect = require(`./src/config/db`);
const jobRouter = require("./src/routes/JobRoutes");
const app = express();
dotenv.config()




app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use("/api/v1/job", jobRouter)

const PORT=process.env.PORT ||8000

mongoDBConnect()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listen in ${process.env.DEV_MODE} port no : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
