import express, { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/me",protectedRoute,(req,res)=>{
    return res.json({user: req.user}) 
}) 

export default router
 