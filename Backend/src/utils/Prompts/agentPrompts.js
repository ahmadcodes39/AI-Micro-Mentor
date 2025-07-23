export const createLessonPrompt = ({ topic, courseName }) => {
  const phrasingVariants = [
    `Create a beginner-friendly lesson on "${topic}" in the context of ${courseName}.`,
    `Teach someone new about "${topic}" in ${courseName} in a detailed and engaging way.`,
    `Design a programming lesson for a complete beginner on "${topic}" within ${courseName}.`,
    `Prepare a self-contained learning module about "${topic}" as part of ${courseName}.`,
    `You're an expert teacher. Create a complete educational lesson about "${topic}" in ${courseName}.`,
  ];

  const selected =
    phrasingVariants[Math.floor(Math.random() * phrasingVariants.length)];

  const now = new Date().getTime();

  return (
    `${selected}

### Please include the following sections clearly:

# [Your Title Here]

## Introduction
Write a clear and concise intro to the topic.

## Key Concepts
- List important concepts as bullet points.

## Code Example
Provide one or two practical examples with code and explanation.

## Summary
Give a brief recap of the key ideas covered.

## Resources
List 3–5 helpful resources with real URLs:
- [Link 1](https://...)
- [Link 2](https://...)
- [Link 3](https://...)

## Estimated Time to Complete
X minutes

## Tags
tag1, tag2, tag3

✅ Make sure:
- Tags are plain lowercase words, comma-separated (no "#", no markdown formatting)
- "Estimated Time to Complete" is clearly written as a number in minutes
- The response has no <think> or system content
- The markdown format is strictly followed

(seed:${now})`
  );
};

export const createInitialLessonPrompt = ({ topic }) => {
  const phrasingVariants = [
    `Create a beginner-friendly lesson on: "${topic}"`,
    `Teach someone new about: "${topic}" in a detailed and engaging way.`,
    `Design a programming lesson for a complete beginner on: "${topic}"`,
    `Prepare a self-contained learning module on: "${topic}"`,
    `You're an expert teacher. Create an educational lesson on: "${topic}"`,
  ];

  const selected =
    phrasingVariants[Math.floor(Math.random() * phrasingVariants.length)];

  const now = new Date().getTime();

  return `${selected}.

Include the following sections:
- A unique **title**
- A brief and clear **introduction**
- Key concepts as **bullet points**
- One or two **code examples**
- A short **summary**
- A list of 3–5 **useful resource links** (real URLs, helpful)
- An estimated time to complete
- A list of **3 to 5 relevant tags** in plain text format (e.g. javascript, web, frontend)

✅ Ensure all sections are fully completed.
❌ Do NOT use filler phrases like "Let me know if you'd like..."
✅ Tags must be single words, lowercase, comma-separated, and related to the topic.
✅ Do NOT use markdown symbols for tags.

(seed:${now})`;
};

export const createFlashCardsPrompt = ({ topic }) => {
  const promptVariants = [
    `Generate 5 flashcards on the topic "${topic}".`,
    `Create 5 flashcards to help a beginner understand "${topic}".`,
    `You are a tutor. Make 5 simple and helpful flashcards for the topic: "${topic}".`,
    `Design 5 educational flashcards that clearly explain "${topic}" to a new learner.`,
    `Provide 5 flashcards for someone studying "${topic}" for the first time.`,
  ];

  const selectedPrompt =
    promptVariants[Math.floor(Math.random() * promptVariants.length)];

  const now = new Date().getTime();

  return `${selectedPrompt}

Each flashcard should follow **exactly** this format, without any markdown, asterisks, or extra symbols:

Front: [your question or keyword here]
Back: [a concise and beginner-friendly explanation or answer here]

✅ Use plain text only.  
✅ Do not use bold text, bullet points, or headers.  
✅ Each flashcard must be clearly separated by a new line starting with "Front:".  
✅ Keep answers short, clear, and easy to understand.

Example:
Front: What is a variable?
Back: A variable is a name that stores a value in a program.

Now generate the flashcards.

(seed:${now})`;
};

export const createQuizPrompt = ({ topic }) => {
  const promptVariants = [
    `Create a multiple-choice quiz with exactly 10 questions on the topic: "${topic}". Also provide a suitable title for the quiz.`,
    `Design a beginner-level quiz of exactly 10 MCQs about "${topic}" and give it a title.`,
    `Prepare a quiz of exactly 10 multiple-choice questions for beginners learning "${topic}", and add a quiz title.`,
    `Generate exactly 10 MCQ-style quiz questions about "${topic}" with explanations, and start with a title for the quiz.`,
    `You're a helpful tutor. Create a 10-question MCQ quiz on "${topic}" with 4 options and a short explanation per question. Include a quiz title.`,
  ];

  const selectedPrompt =
    promptVariants[Math.floor(Math.random() * promptVariants.length)];

  const now = new Date().getTime();

  return `${selectedPrompt}

Start your response with:
Title: [Your quiz title]

Each question must follow this format:

Question: [Your question here]
A. [Option A]
B. [Option B]
C. [Option C]
D. [Option D]
Answer: [Correct option letter]
Explanation: [Brief explanation why this option is correct]

✅ Requirements:
- One quiz title at the top
- Exactly 10 questions
- 4 distinct options (A to D) for each
- Only **one correct answer per question**
- A short, clear explanation (1–2 lines) for each correct answer
- Keep it simple and beginner-friendly
- Avoid markdown or special formatting

(seed:${now})`;
};

