import mongoose from "mongoose";
import slugify from "slugify";
const lessonSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Lesson content is required"],
    },

    duration: {
      type: Number,
      default: 5,
    },

    resources: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },
    completionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
