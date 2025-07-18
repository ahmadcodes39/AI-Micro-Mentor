import slugify from "slugify";
import callAgent from "../agent.js";
import Lesson from "../../models/lessonsModal.js";
import Course from "../../models/courseModal.js";
import { extractLinks } from "../../utils/helperFunctions.js";
import {
  createFlashCardsPrompt,
  createLessonPrompt,
  createQuizPrompt,
} from "../../utils/Prompts/agentPrompts.js";

export const createLessonsByAgent = async ({ topic }) => {
  console.log("Lesson topic ",topic)
  const prompt = createLessonPrompt({topic});
  console.log(`AI prompt ${prompt}`)
  let aiResponse = await callAgent(prompt);
  aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  const [titleLine, ...restContent] = aiResponse.split("\n");
  const title = titleLine.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const content = restContent.join("\n").trim();
  const resources = extractLinks(aiResponse);
  let duration = 5;
  const timeMatch = aiResponse.match(/(\d+)\s*(minutes|min)\b/i);               
  if (timeMatch) {
    duration = parseInt(timeMatch[1]);
  }

  const slug = slugify(title, { lower: true });

  return {
    title,
    slug,
    content,
    duration,
    resources,
    tags: [topic.toLowerCase()],
    aiResponse,
  };
};

export const createFlashCardsByAgent = async ({
  topic,
  userId,
  courseId,
  lessonId,
}) => {
  try {
    const prompt = createFlashCardsPrompt({ topic });
    let aiResponse = await callAgent(prompt);

    aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    const flashcards = [];
    const cardPattern = /Front:\s*(.+?)\s*Back:\s*(.+?)(?=\nFront:|\n*$)/gs;

    let match;
    while ((match = cardPattern.exec(aiResponse)) !== null) {
      const front = match[1].trim();
      const back = match[2].trim();

      if (front && back) {
        flashcards.push({
          createdBy: userId,
          course: courseId,
          lesson: lessonId,
          front,
          back,
        });
      }
    }

    return flashcards;
  } catch (error) {
    console.error("Flashcard Agent Error:", error.message);
    throw new Error("Failed to generate flashcards");
  }
};

export const createQuizByAgent = async ({
  lessonID,
  topic,
  userId,
  courseID,
}) => {
  try {
    const prompt = createQuizPrompt({ topic });
    let aiResponse = await callAgent(prompt);

    aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    const questionPattern =
      /Question:\s*(.+?)\s*A\.\s*(.+?)\s*B\.\s*(.+?)\s*C\.\s*(.+?)\s*D\.\s*(.+?)\s*Answer:\s*([ABCD])\s*Explanation:\s*(.+?)(?=\nQuestion:|\n*$)/gs;

    const quizQuestions = [];
    
    let match;

    while ((match = questionPattern.exec(aiResponse)) !== null) {
      const [
        _,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswerLetter,
        explanation,
      ] = match;

      const options = [
        optionA.trim(),
        optionB.trim(),
        optionC.trim(),
        optionD.trim(),
      ];

      const letterIndexMap = { A: 0, B: 1, C: 2, D: 3 };
      const correctIndex = letterIndexMap[correctAnswerLetter.trim()];
      const correctAnswer = options[correctIndex];

      quizQuestions.push({
        createdBy: userId,
        course: courseID,
        lesson: lessonID,
        question: question.trim(),
        options,
        answer: correctAnswer,
        explanation: explanation.trim(),
      });
    }

    return quizQuestions;
  } catch (error) {
    console.error("Quiz Agent Error:", error.message);
    throw new Error("Failed to generate quiz");
  }
};

