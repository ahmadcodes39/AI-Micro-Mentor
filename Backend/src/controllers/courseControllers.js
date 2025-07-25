import Course from "../models/courseModal.js";
import Progress from "../models/progressSchema.js";
import Quiz from "../models/quizModals.js";
import Lesson from "../models/lessonsModal.js";
import FlashCard from '../models/flashCardsModal.js'

export const getAllCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const courses = await Course.find({ createdBy: userId }).lean();

    const coursesWithDetails = await Promise.all(
      courses.map(async (course) => {
        const totalLessons = await Lesson.countDocuments({
          course: course._id,
        });

        const completedLessons = await Lesson.countDocuments({
          createdBy: userId,
          course: course._id,
          completionDate: { $exists: true, $ne: null },
        });

        const progress =
          totalLessons === 0
            ? 0
            : Math.round((completedLessons / totalLessons) * 100);

        return {
          ...course,
          totalLessons,
          completedLessons,
          progress,
        };
      })
    );

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses: coursesWithDetails,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSpecificCourse = async (req, res) => {
  try {
    const { slug } = req.params;

    const desiredCourse = await Course.findOne({ slug }).populate("lessons");
    const totalLessons = await Lesson.countDocuments({
      course: desiredCourse._id,
    });

    if (!desiredCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ message: "Course found", totalLessons, course: desiredCourse });
  } catch (error) {
    console.error("Error fetching desired course:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const new_course = await Course.create({
      name,
      description,
      category,
      createdBy: req.user._id,
    });
    return res.status(200).json({
      message: "New course created successfully",
      new_course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const lessons = await Lesson.find({ course: id });

    const lessonIds = lessons.map((lesson) => lesson._id);

    await Quiz.deleteMany({ course: id, lesson: { $in: lessonIds } });
    await FlashCard.deleteMany({ course: id, lesson: { $in: lessonIds } });

    await Lesson.deleteMany({ course: id });

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ message: "Course and all related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
