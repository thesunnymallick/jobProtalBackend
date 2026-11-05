const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength:[2, "Name must be least 2 characters"],
      maxLength:[50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator:(value)=>validator.isEmail(value),
        message:"Please provide a valid email"
      } 
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      select: false,
    },
    location: {
      type: String,
      default: "Delhi",
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either user or admin",
      },
      default: "user",
    },
    phone: {
      type: String,
      trim:true,
    },
    headline: {
      type: String,
      trim:true,
    },
    bio: {
      type: String,
      trim:true,
    },
    skills: {
      type: [String],
    },
    experience: {
      type: [
        {
          title: {
            type: String,
            trim:true,
          },
          company: {
            type: String,
            trim:true,
          },
          location: {
            type: String,

          },
          startDate: {
            type: Date,
          },
          endDate: {
            type: Date,
          },
          currentPosition: {
            type: Boolean,
            default: false,

          },
          description: {
            type: String,
            trim:true,
          },
        },
      ],
    },
    education: {
      type: [
        {
          institute: {
            type: String,
          },
          degree: {
            type: String,
          },
          fieldOfStudy: {
            type: String,
          },
          startYear: {
            type: String,
          },
          endYear: {
            Type: String,
          },
        },
      ],
    },
    resume: {
      type: String,
       trim:true,
    },
    profilePhoto: {
      type: String,
      trim:true,
    },
    links: {
      linkedin: {
        type: String,
        trim:true,
      },
      github: {
        type: String,
        trim:true,
      },
      portfolio: {
        type: String,
        trim:true,
      },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  // Only hash when the password changed, so saving a role update doesn't re-hash it
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
