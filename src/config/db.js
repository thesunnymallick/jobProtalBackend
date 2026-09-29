const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config()


const mongoDBConnect = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL, { dbName: "job_portal" });
};

module.exports = mongoDBConnect;
