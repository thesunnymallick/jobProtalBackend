const express = require("express");
const mongoDBConnect = require(`./src/config/db`);
const jobRouter = require("./src/routes/JobRoutes");
const app = express();
const PORT = 8000;




app.use(express.json())
app.use("/api/v1/job", jobRouter)

mongoDBConnect()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listen PORT On : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
