import { Router } from "express";
import { deleteCards, generateFlashCards, getAllFlashCards } from "../controllers/flashCardsControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";


const router = Router()

router.post('/:courseId/:lessonId',protectedRoute,generateFlashCards)
router.get('/:courseID/:lessonID',protectedRoute,getAllFlashCards)
router.delete('/delete-card',protectedRoute,deleteCards)

export default router 