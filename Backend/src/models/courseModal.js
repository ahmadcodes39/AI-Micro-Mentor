import mongoose from "mongoose";
import slugify from "slugify";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      minlength: [3, "Course name must be at least 3 characters long"],
      maxlength: [100, "Course name must be at most 100 characters long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      minlength: [10, "Course description must be at least 10 characters long"],
      maxlength: [500, "Course description must be at most 500 characters long"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    category: {
      type: String,
      required: [true, "Course category is required"],
      default: "Programming",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


courseSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
 