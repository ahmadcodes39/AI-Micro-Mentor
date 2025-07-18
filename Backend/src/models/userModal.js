import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [2, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, 
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    avatar:{
      type:String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    }, 
    learningGoal: {
      type: String,
    },
    dailyTargetMinutes: {
      type: Number,
      min: [5, "Minimum daily time must be 5 minutes"],
      max: [240, "Maximum daily time cannot exceed 240 minutes"],
    },
  },
  {
    timestamps: true,
  }
);

const User =  mongoose.model("User", userSchema);
export default User
