import { createFlashCardsByAgent } from "../Agent/controllers/agentController.js";
import FlashCards from "../models/flashCardsModal.js";
import mongoose from "mongoose";

export const generateFlashCards = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { topic } = req.body;
    const userId = req?.user?._id;

    if (!topic || !courseId || !lessonId) {
      return res
        .status(400)
        .json({ message: "Missing topic, courseID or lessonID" });
    }

    const flashCards = await createFlashCardsByAgent({
      topic,
      userId,
      courseId,
      lessonId,
    });

    if (!flashCards.length) {
      return res.status(400).json({ message: "No flashcards generated" });
    }

    const createdCards = await FlashCards.insertMany(flashCards);

    return res.status(201).json({
      message: "Flashcards generated successfully",
      cards: createdCards,
    });
  } catch (error) {
    console.error("Error generating flashcards:", error.message);
    return res
      .status(500)
      .json({ message: "Server error generating flashcards" });
  }
};

export const getAllFlashCards = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req?.user?._id;

    if (!userId || !courseId || !lessonId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const getCards = await FlashCards.find({
      createdBy: userId,
      course: courseId,
      lesson: lessonId,
    }).sort({ createdAt: -1 });

    if (!getCards.length) {
      return res.status(404).json({ message: "No flashcards found" });
    }

    return res.status(200).json({
      message: "Cards data fetched successfully",
      cards: getCards,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in getting FlashCards ${error?.message}` });
  }
};

export const deleteCards = async (req, res) => {
  try {
    const { id } = req.body;
    const card = await FlashCards.findByIdAndDelete(id);
    if (!card) {
      return res.status(400).json({ message: "Card not found" });
    }
    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error?.message}` });
  }
};
