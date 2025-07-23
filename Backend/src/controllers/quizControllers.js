import { createQuizByAgent } from "../Agent/controllers/agentController.js";
import Lesson from "../models/lessonsModal.js";
import Progress from "../models/progressSchema.js";
import Quiz from "../models/quizModals.js";
import { v4 as uuidv4 } from "uuid";

export const generateQuiz = async (req, res) => {
  try {
    const { lessonID, courseID } = req.params;
    const { topic } = req.body;
    const userId = req?.user?._id;

    if (!topic || !lessonID || !courseID) {
      return res
        .status(400)
        .json({ message: "Missing topic, courseID or lessonId" });
    }
    const quizSessionId = uuidv4();

    const generatedQuiz = await createQuizByAgent({
      topic,
      userId,
      lessonID,
      courseID,
    });

    const quizWithSession = generatedQuiz.map((q) => ({
      ...q,
      quizSessionId,
    }));
    if (!quizWithSession.length) {
      return res.status(400).json({ message: "No Quiz generated" });
    }
    console.log("quiz befre saving ", quizWithSession);
    const saveQuiz = await Quiz.insertMany(quizWithSession);
    console.log("quiz After saving ", saveQuiz);
    return res.status(201).json({
      message: "Quiz generated successfully",
      quiz: saveQuiz,
    });
  } catch (error) {
    console.error("Error generating Quiz:", error.message);
    return res.status(500).json({ message: "Server error generating Quiz" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizSessionId, answers } = req.body;
    const userId = req?.user?._id;

    if (!quizSessionId || !answers || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ message: "quizSessionId and answers are required" });
    }

    const quizQuestions = await Quiz.find({ quizSessionId, createdBy: userId });

    let scoreCount = 0;
    const result = [];

    for (const { questionId, selectedAnswer } of answers) {
      const q = quizQuestions.find((q) => q._id.toString() === questionId);

      if (q) {
        const isCorrect = q.answer === selectedAnswer;
        if (isCorrect) scoreCount++;

        result.push({
          question: q.question,
          selectedAnswer,
          correctAnswer: q.answer,
          isCorrect,
          explanation: q.explanation,
        });
      } else {
        result.push({
          questionId,
          selectedAnswer,
          isCorrect: false,
          error: "Question not found",
        });
      }
    }

    // Use the first question to determine lesson & course
    const sampleQ = quizQuestions[0];

    await Progress.findOneAndUpdate(
      { createdBy: userId, lesson: sampleQ.lesson, quiz: sampleQ._id },
      {
        createdBy: userId,
        lesson: sampleQ.lesson,
        quiz: sampleQ._id,
        completed: true,
        completionDate: new Date(),
        quizScore: scoreCount,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Quiz submitted successfully",
      quizSessionId,
      score: scoreCount,
      totalQuestions: answers.length,
      result,
    });
  } catch (error) {
    console.error("Quiz submission error:", error.message);
    return res.status(500).json({ message: "Server error submitting quiz" });
  }
};

export const quizHistory = async (req, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get all quiz questions created by the user
    const quizzes = await Quiz.find({ createdBy: userId })
      .select(
        "title question answer options explanation createdAt updatedAt lesson course quizSessionId"
      )
      .populate("")
      .sort({ createdAt: -1 });

    // Get all progress records of this user
    const progressRecords = await Progress.find({ createdBy: userId }).lean();

    // Create a map of quizSessionId to score
    const sessionIdToScoreMap = new Map();
    progressRecords.forEach((progress) => {
      if (progress.quizSessionId && progress.quizScore !== undefined) {
        sessionIdToScoreMap.set(progress.quizSessionId, progress.quizScore);
      }
    });

    // Group quizzes by quizSessionId
    const groupedBySession = quizzes.reduce((acc, quiz) => {
      const sessionId = quiz.quizSessionId;

      if (!acc[sessionId]) {
        acc[sessionId] = {
          quizSessionId: sessionId,
          title: quiz.title,
          course: quiz.course,
          lesson: quiz.lesson,
          createdAt: quiz.createdAt,
          score: sessionIdToScoreMap.get(sessionId) || null,
          questions: [],
        };
      }

      acc[sessionId].questions.push({
        _id: quiz._id,
        question: quiz.question,
        answer: quiz.answer,
        options: quiz.options,
        explanation: quiz.explanation,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      });

      return acc;
    }, {});

    const history = Object.values(groupedBySession);

    return res.status(200).json({
      message: "User quiz history fetched successfully",
      totalSessions: history.length,
      history,
    });
  } catch (error) {
    console.error("Quiz History Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error fetching quiz history" });
  }
};

export const getQuizForSpecificLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user_id;

  try {
    // Step 1: Find all quiz questions for the given course and lesson
    const allQuestions = await Quiz.find({
      course: courseId,
      lesson: lessonId,
    });

    // Step 2: Group questions by quizSessionId
    const groupedQuizzes = {};
    for (const q of allQuestions) {
      if (!groupedQuizzes[q.quizSessionId]) {
        groupedQuizzes[q.quizSessionId] = {
          quizSessionId: q.quizSessionId,
          title: q.title,
          course: q.course,
          lesson: q.lesson,
          createdBy: q.createdBy,
          createdAt: q.createdAt,
          updatedAt: q.updatedAt,
          questions: [],
        };
      }

      groupedQuizzes[q.quizSessionId].questions.push({
        _id: q._id,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      });
    }

    // Step 3: Add progress info for each quiz session
    const quizzesWithProgress = await Promise.all(
      Object.values(groupedQuizzes).map(async (quizGroup) => {
        // Find any progress entry for this quizSession
        const anyQuestionId = quizGroup.questions[0]._id;
        const progress = await Progress.findOne({
          createdBy: userId,
          lesson: lessonId,
          quiz: anyQuestionId, // Assuming at least one question represents the quiz session
        });             

        return {
          ...quizGroup,
          completed: progress?.completed || false,
          completionDate: progress?.completionDate || null,
          quizScore: progress?.quizScore || null,
        };
      })
    );

    res.status(200).json({
      message: "Grouped quizzes with progress fetched successfully",
      totalQuizzes: quizzesWithProgress.length,
      quiz: quizzesWithProgress,
    });
  } catch (error) {
    console.error("Error fetching grouped quizzes:", error.message);
    res.status(500).json({ message: "Server error while fetching quizzes" });
  }
};

