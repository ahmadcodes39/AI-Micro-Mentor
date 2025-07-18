import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { createLesson, deleteLesson, getAllLessons, getIndividualLesson } from "../controllers/lessonControllers.js";

const router = Router()

router.get('/:courseId', protectedRoute, getAllLessons);
router.get('/:courseId/:lessonId', protectedRoute, getIndividualLesson);
router.post('/:courseId', protectedRoute, createLesson);
router.delete("/delete/:courseId/:lessonId", protectedRoute, deleteLesson);

export default router 