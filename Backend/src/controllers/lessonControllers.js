import Lesson from "../models/lessonsModal.js";
import User from "../models/userModal.js";
import Course from "../models/courseModal.js";
import { createInitialLessonsByAgent, createLessonsByAgent } from "../Agent/controllers/agentController.js";
import slugify from "slugify";

export const getAllLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({
      course: courseId,
      createdBy: req.user._id,
    }).populate("course", "name");

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
    console.log("From backend ID ", courseId);
    console.log("From backend Course Name ", courseName);
    console.log("From backend lesson Title ", topic);

    if (!topic || !courseId || !courseName) {
      return res.status(400).json({
        message: "Both topic, courseId, and courseName are required",
      });
    }
    const { title, content, duration, resources, tags, aiResponse } =
      await createLessonsByAgent({ topic, courseName });
    // Generate base slug
    let baseSlug = slugify(title || "untitled", { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique in the Lesson collection
    while (await Lesson.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
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
      await createInitialLessonsByAgent({ topic });
    // Generate base slug
    let baseSlug = slugify(title || "untitled", { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique in the Lesson collection
    while (await Lesson.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
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
    const lesson = await Lesson.findOne({ _id: lessonId, createdBy: userId });
    if (!lesson) {
      return res
        .status(404)
        .json({ message: "Lesson not found or unauthorized" });
    }

    await Lesson.findByIdAndDelete(lessonId);

    await Course.findByIdAndUpdate(courseId, {
      $pull: { lessons: lessonId },
    });

    return res.status(200).json({ message: "Lesson deleted successfully" });
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
