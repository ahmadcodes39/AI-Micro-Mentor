import Course from "../models/courseModal.js";
import Progress from "../models/progressSchema.js";
import Quiz from "../models/quizModals.js";
import Lesson from "../models/lessonsModal.js";
import FlashCard from "../models/flashCardsModal.js";

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

export const userStats = async (req, res) => {
  const userId = req.user?._id;

  try {
    // 1. Count total number of courses created by the user
    const totalCourses = await Course.countDocuments({ createdBy: userId });

    // 2. Count total number of completed lessons
    const lessonCompleted = await Lesson.countDocuments({
      completionDate: { $ne: null },
    });

    // 3. Count total number of quizzes attempted by the user
    const quizAttempted = await Progress.countDocuments({
      createdBy: userId,
      quiz: { $ne: null },
      completed: true,
    });

    // 4. Count total flashcards created by the user
    const totalFlashCards = await FlashCard.countDocuments({
      createdBy: userId,
    });

    // 5. Get the most recently completed lesson's course
    const recentProgress = await Progress.findOne({
      createdBy: userId,
      lesson: { $ne: null },
    })
      .sort({ completionDate: -1, updatedAt: -1 })
      .populate({
        path: "lesson",
        select: "course",
      });

    let recentCourse = null;

    if (recentProgress?.lesson?.course) {
      // Get the course details
      recentCourse = await Course.findById(recentProgress.lesson.course).lean();

      if (recentCourse) {
        // Count total lessons in the course
        const totalLessons = await Lesson.countDocuments({
          course: recentCourse._id,
          createdBy: userId,
        });

        // Count how many lessons the user has completed for this course
        const completedLessons = await Lesson.countDocuments({
          course: recentCourse._id,
          createdBy: userId,
          completionDate: { $exists: true, $ne: null },
        });

        // Calculate progress percentage
        const progress =
          totalLessons === 0
            ? 0
            : Math.round((completedLessons / totalLessons) * 100);

        // Attach progress to recentCourse object
        recentCourse.progress = progress;
      }
    }

    // 6. Get the latest updated lesson created by the user (acts as upcoming lesson)
    const upcomingLessons = await Lesson.findOne({
      createdBy: userId,
      completionDate: { $eq: null },
    })
      .sort({ updatedAt: -1 })

    // 7. Send the final response
    return res.status(200).json({
      message: "Data found",
      stats: {
        totalCourses,
        lessonCompleted, 
        quizAttempted,
        totalFlashCards,
        recentCourse,
        upcomingLessons, 
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({
      message: "An error occurred while fetching user stats.",
      error: error.message,
    });
  }
};
