import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getSpecificCourse, updateCourse } from "../controllers/courseControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router()

router.get('/', protectedRoute, getAllCourses);
router.get('/:slug', protectedRoute, getSpecificCourse);
router.post('/', protectedRoute, createCourse);
router.put('/:id', protectedRoute, updateCourse); 
router.delete('/:id', protectedRoute, deleteCourse);


export default router
