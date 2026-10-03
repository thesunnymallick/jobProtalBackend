// Seed random jobs for a user (for testing stats): npm run seed-jobs -- admin@example.com 40
const mongoose = require("mongoose");
const mongoDBConnect = require("../src/config/db");
const User = require("../src/models/UserModel");
const Job = require("../src/models/JobModel");

const titles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "React Native Developer",
  "DevOps Engineer",
  "Data Analyst",
  "QA Automation Engineer",
  "UI/UX Designer",
  "Node.js Developer",
  "Cloud Engineer",
  "Machine Learning Engineer",
  "Product Manager",
];
const companies = ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato", "Swiggy", "Razorpay", "Paytm", "Infosys", "TCS", "Freshworks", "CRED"];
const locations = ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi", "Chennai", "Kolkata", "Remote"];
const salaries = ["4-6 LPA", "6-10 LPA", "10-15 LPA", "15-25 LPA", "25-40 LPA"];
const skillPool = ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "SQL", "AWS", "Docker", "Python", "Git", "Figma"];
const workTypes = ["full-time", "part-time", "internship", "contract"];
const statuses = ["pending", "rejected", "interview"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMany = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n);

const seedJobs = async () => {
  const email = process.argv[2];
  const count = Number(process.argv[3]) || 40;
  if (!email) {
    console.log("Usage: npm run seed-jobs -- <email> [count]");
    process.exit(1);
  }

  await mongoDBConnect();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.log(`No user found with email ${email}`);
    await mongoose.disconnect();
    return;
  }

  const jobs = Array.from({ length: count }, () => {
    const title = pick(titles);
    const company = pick(companies);
    // spread createdAt over the last 6 months so monthly stats have data too
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000);
    return {
      title,
      company,
      description: `${company} is hiring a ${title} to build and maintain scalable products.`,
      location: pick(locations),
      salary: pick(salaries),
      skills: pickMany(skillPool, 3 + Math.floor(Math.random() * 3)),
      workType: pick(workTypes),
      status: pick(statuses),
      createdBy: user._id,
      createdAt,
      updatedAt: createdAt,
    };
  });

  await Job.insertMany(jobs, { timestamps: false });
  console.log(`Inserted ${count} jobs for ${user.email}`);
  await mongoose.disconnect();
};

seedJobs().catch((error) => {
  console.log("Failed to seed jobs:", error.message);
  process.exit(1);
});
