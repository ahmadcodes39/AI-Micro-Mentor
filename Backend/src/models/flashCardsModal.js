import mongoose from "mongoose";

const flashCardsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    front: {
      type: String,
      required: [true, "Flash Card front text is required"],
      trim: true,
    },
    back: {
      type: String,
      required: [true, "Flash Card back text is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlashCards =  mongoose.model("flashCards", flashCardsSchema);
export default  FlashCards
