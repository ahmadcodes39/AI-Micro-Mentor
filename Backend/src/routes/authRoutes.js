import express, { Router } from "express";
import { loginUser, logoutUser, registerUser, updatProfile } from "../controllers/authControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/update-profile",protectedRoute,updatProfile)
router.post("/logout",logoutUser)
router.get("/me",protectedRoute,(req,res)=>{
    return res.json({user: req.user}) 
}) 

export default router
 