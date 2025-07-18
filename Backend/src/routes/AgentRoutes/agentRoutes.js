import { Router } from "express";
import { protectedRoute } from "../../middlewares/protectedRoute.js";
import { createLessonsByAgent } from "../../Agent/controllers/agentController.js";

const router = Router()

// router.post('/create-lessons/:courseId',protectedRoute,createLessonsByAgent)

export default router 