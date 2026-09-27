const mongoose = require("mongoose");

const MONGODB_URL = `mongodb+srv://alfesunnymallick800_db_user:6go8dbkwy4VnJVRr@cluster0.waosnuu.mongodb.net`;

const mongoDBConnect = async () => {
  await mongoose.connect(MONGODB_URL, { dbName: "job_portal" });
};

module.exports = mongoDBConnect;
