// Promote an existing user to admin: npm run make-admin -- user@example.com
const mongoose = require("mongoose");
const mongoDBConnect = require("../src/config/db");
const User = require("../src/models/UserModel");

const makeAdmin = async () => {
  const email = process.argv[2];
  if (!email) {
    console.log("Usage: npm run make-admin -- <email>");
    process.exit(1);
  }

  await mongoDBConnect();
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: "admin" },
    { new: true },
  );

  if (!user) {
    console.log(`No user found with email ${email}`);
  } else {
    console.log(`${user.email} is now an admin. They must log in again to get a new token.`);
  }
  await mongoose.disconnect();
};

makeAdmin().catch((error) => {
  console.log("Failed to make admin:", error.message);
  process.exit(1);
});
