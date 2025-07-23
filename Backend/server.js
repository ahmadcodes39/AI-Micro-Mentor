import express from "express";
import "dotenv/config";
import { connectTodb } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import lessonRoutes from "./src/routes/lessonRoutes.js";
import flashCardRoutes from "./src/routes/flashcardRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

connectTodb();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("App is running");
});
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  credentials: true               
}));
     

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lesson", lessonRoutes);                                                        
app.use('/api/flashCards',flashCardRoutes)
app.use('/api/quiz',quizRoutes)      
 
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
