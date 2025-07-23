import { Router } from "express"
import { generateQuiz, getQuizForSpecificLesson, quizHistory, submitQuiz } from "../controllers/quizControllers.js"
import { protectedRoute } from "../middlewares/protectedRoute.js"

const router = Router()

router.post("/create-quiz/:courseID/:lessonID",protectedRoute,generateQuiz)
router.post("/submit-quiz/:courseID/:lessonID",protectedRoute,submitQuiz)
router.get("/get-quiz/:courseId/:lessonId",protectedRoute,getQuizForSpecificLesson)
router.get("/quiz-history",protectedRoute,quizHistory)


export default router 