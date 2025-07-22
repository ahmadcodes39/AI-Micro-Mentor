import slugify from "slugify";
import callAgent from "../agent.js";
import Lesson from "../../models/lessonsModal.js";
import Course from "../../models/courseModal.js";
import { extractLinks } from "../../utils/helperFunctions.js";
import {
  createFlashCardsPrompt,
  createInitialLessonPrompt,
  createLessonPrompt,
  createQuizPrompt,
} from "../../utils/Prompts/agentPrompts.js";

export const createLessonsByAgent = async ({ topic, courseName }) => {
  console.log("Lesson topic", topic);

  const prompt = createLessonPrompt({ topic, courseName });
  console.log(`AI prompt ${prompt}`);

  let aiResponse = await callAgent(prompt);
  aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // ✅ Title extraction (both cases)
  let title = "Untitled Lesson";
  let titleMatch = aiResponse.match(/^#\s*(.+)$/m); // Case 1: Markdown heading

  if (!titleMatch) {
    titleMatch = aiResponse.match(/(?:\*\*|###+)?\s*Title[:：]?\s*(.+)/i); // Case 2: Labeled title
  }

  if (titleMatch) {
    title = titleMatch[1].replace(/[*_`#-]/g, "").trim();
  }

  // ✅ Content: remove title line only, keep rest including Resources & Time
  const content = aiResponse
    .replace(/^#\s*.+$/m, "") // Remove Markdown title
    .replace(/(?:\*\*|###+)?\s*Title[:：]?.+$/im, "") // Remove labeled title if present
    .trim();

  // ✅ Extract resource links (optional: leave as is if `extractLinks` works well)
  const resources = extractLinks(aiResponse);

  // ✅ Extract duration
  let duration = 5;
  const timeMatch = aiResponse.match(/##\s*Estimated Time to Complete[\s\S]*?(\d+)\s*(minutes|min)/i);
  if (timeMatch) {
    duration = parseInt(timeMatch[1]);
  }

  // ✅ Extract tags (still stripping this from the response)
  let tags = [];
  const tagsMatch = aiResponse.match(/##\s*Tags\s*\n(.+)/i);
  if (tagsMatch) {
    tags = tagsMatch[1].split(",").map((tag) => tag.trim().toLowerCase());
  }

  const slug = slugify(title, { lower: true });

  return {
    title,
    slug,
    content,
    duration,
    resources,
    tags,
    aiResponse,
  };
};



export const createInitialLessonsByAgent = async ({ topic }) => {
  const prompt = createInitialLessonPrompt({ topic });
  let aiResponse = await callAgent(prompt);
  aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // ✅ Title extraction (Markdown heading or label style)
  let title = "Untitled Lesson";
  let titleMatch = aiResponse.match(/^#\s*(.+)$/m); // Case 1: "# Title"

  if (!titleMatch) {
    titleMatch = aiResponse.match(/(?:\*\*|###+)?\s*Title[:：]?\s*(.+)/i); // Case 2: "**Title:** ..."
  }

  if (titleMatch) {
    title = titleMatch[1].replace(/[*_`#-]/g, "").trim();
  }

  // ✅ Content: remove only title + tags section (keep Resources + Time)
  const content = aiResponse
    .replace(/^#\s*.+$/m, "") // Remove Markdown title
    .replace(/(?:\*\*|###+)?\s*Title[:：]?.+$/im, "") // Remove labeled title
    .replace(/##\s*Tags\s*\n.+/i, "") // Remove tags section o
    .trim();

  // ✅ Extract resource links
  const resources = extractLinks(aiResponse);

  // ✅ Extract duration (from "Estimated Time to Complete" section)
  let duration = 5;
  const timeMatch = aiResponse.match(
    /##\s*Estimated Time to Complete[\s\S]*?(\d+)\s*(minutes|min)/i
  );
  if (timeMatch) {
    duration = parseInt(timeMatch[1]);
  }

  // ✅ Extract tags
  let tags = [];
  const tagsMatch = aiResponse.match(/##\s*Tags\s*\n(.+)/i);
  if (tagsMatch) {
    tags = tagsMatch[1].split(",").map((tag) => tag.trim().toLowerCase());
  }

  const slug = slugify(title, { lower: true });

  return {
    title,
    slug,
    content,
    duration,
    resources,
    tags,
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
    console.log("Ai rresponse for the flashcards ",aiResponse)
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
