import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    quizSessionId: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completionDate: {
      type: Date,
    },

    quizScore: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
