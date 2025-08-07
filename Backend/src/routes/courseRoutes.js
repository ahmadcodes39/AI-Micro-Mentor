import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, updateCourse, userStats } from "../controllers/courseControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router()

router.get('/', protectedRoute, getAllCourses);
// router.get('/:slug', protectedRoute, getSpecificCourse);
router.post('/', protectedRoute, createCourse);
router.put('/edit-course/:id', protectedRoute, updateCourse); 
router.delete('/:id', protectedRoute, deleteCourse);
router.get('/user-stats', protectedRoute, userStats);



export default router
