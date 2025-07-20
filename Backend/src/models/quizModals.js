import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",        
    },
    quizSessionId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2 && arr.length <= 4,
        message: "Options must be between 2 to 4",
      },
    },
    answer: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return this.options.includes(val);
        },
        message: "Correct answer must be one of the options",
      },
    },
    explanation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz",quizSchema)
export default Quiz