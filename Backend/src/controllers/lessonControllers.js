import Lesson from "../models/lessonsModal.js";
import User from "../models/userModal.js";
import Course from "../models/courseModal.js";
import Quiz from "../models/quizModals.js";
import FlashCards from "../models/flashCardsModal.js";

import {
  createInitialLessonsByAgent,
  createLessonsByAgent,
} from "../Agent/controllers/agentController.js";
import slugify from "slugify";
import Progress from "../models/progressSchema.js";

export const getAllLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({
      course: courseId,
      createdBy: req.user._id,
    })
      .populate("course", "name")
      .sort({ createdAt: -1 });

    if (!lessons || lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons found for this user" });
    }

    return res.status(200).json({ message: "Lessons found", lessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { topic, courseName } = req.body;
    const userId = req?.user?._id;

    if (!topic || !courseId || !courseName) {
      return res.status(400).json({
        message: "Both topic, courseId, and courseName are required",
      });
    }
    const { title, content, duration, resources, tags, aiResponse } =
      await createLessonsByAgent({ topic, courseName,userId });
    // Generate base slug
    let baseSlug = slugify(title || "untitled", { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique in the Lesson collection
    slug = `${baseSlug}-${String(userId).slice(-4)}-${Date.now()}`;

    const new_lesson = await Lesson.create({
      createdBy: userId,
      course: courseId,
      title,
      slug,
      content,
      duration,
      resources,
      tags,
    });
    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: new_lesson._id },
    });

    return res.status(201).json({
      message: "Lesson created by agent successfully",
      lesson: new_lesson,
      aiResponse,
    });
  } catch (error) {
    console.error("Lesson Agent Error:", error.message);
    return res.status(500).json({ message: "Lesson By agent not created" });
  }
};

export const createInitialLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { topic } = req.body;
    const userId = req?.user?._id;
    console.log("Initial Lesson ID ", courseId);
    console.log("Initial Lesson lesson Title ", topic);

    if (!topic || !courseId) {
      return res.status(400).json({
        message: "Both topic, courseId are required",
      });
    }
    const { title, content, duration, resources, tags, aiResponse } =
      await createInitialLessonsByAgent({ topic, userId });
    // Generate base slug
    let baseSlug = slugify(title || "untitled", { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique in the Lesson collection
    slug = `${baseSlug}-${String(userId).slice(-4)}-${Date.now()}`;

    const new_lesson = await Lesson.create({
      createdBy: userId,
      course: courseId,
      title,
      slug,
      content,
      duration,
      resources,
      tags,
    });
    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: new_lesson._id },
    });

    return res.status(201).json({
      message: "Lesson created by agent successfully",
      lesson: new_lesson,
      aiResponse,
    });
  } catch (error) {
    console.error("Lesson Agent Error:", error.message);
    return res.status(500).json({ message: "Lesson By agent not created" });
  }
};

export const deleteLesson = async (req, res) => {
  const { lessonId, courseId } = req.params;
  const userId = req.user?._id;

  if (!lessonId || !courseId) {
    return res
      .status(400)
      .json({ message: "Lesson ID and Course ID are required" });
  }

  try {
    // Step 1: Verify that the lesson exists and belongs to the user
    const lesson = await Lesson.findOne({ _id: lessonId, createdBy: userId });
    if (!lesson) {
      return res
        .status(404)
        .json({ message: "Lesson not found or unauthorized" });
    }

    // Step 2: Get quizzes related to this lesson
    const quizzes = await Quiz.find({ lesson: lessonId });
    const quizIds = quizzes.map((quiz) => quiz._id);

    // Step 3: Delete related quizzes, flashcards, and progress
    await Quiz.deleteMany({ lesson: lessonId });
    await FlashCards.deleteMany({ lesson: lessonId });
    await Progress.deleteMany({
      $or: [
        { lesson: lessonId },
        { quiz: { $in: quizIds } }
      ]
    });

    // Step 4: Delete the lesson
    await Lesson.findByIdAndDelete(lessonId);

    // Step 5: Remove the lesson reference from the course (if applicable)
    await Course.findByIdAndUpdate(courseId, {
      $pull: { lessons: lessonId },
    });

    return res.status(200).json({
      message: "Lesson and all related quizzes, flashcards, and progress deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return res.status(500).json({ message: "Failed to delete lesson" });
  }
};


export const getIndividualLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    if (!lessonId || !courseId) {
      return res
        .status(400)
        .json({ message: "Lesson ID and Course ID are required" });
    }
    const lesson = await Lesson.findOne({
      course: courseId,
      _id: lessonId,
    }).populate("course", "name");
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    return res.status(200).json({ message: "Lesson found", lesson });
  } catch (error) {
    console.error("Error fetching individual lesson:", error);
    return res.status(500).json({ message: "Failed to get lesson" });
  }
};

export const updateLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId, course: courseId },
      { $set: { completionDate: new Date() } },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson updated", lesson: updatedLesson });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
  