export const createLessonPrompt = ({ topic }) => {
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

Include the following:
- A unique **title**
- A brief and clear **introduction**
- Key concepts as **bullet points**
- One or two **code examples**
- A short **summary**
- A list of 3–5 **useful resource links** (real URLs, helpful)
- An estimated time to complete

Ensure clarity and usefulness for someone new to this topic. (seed:${now})`;
};

export const createFlashCardsPrompt = ({ topic }) => {
  const promptVariants = [
    `Generate 5 flashcards on the topic "${topic}".`,
    `Create 5 flashcards to help a beginner understand "${topic}".`,
    `You are a tutor. Make 5 simple and helpful flashcards for the topic: "${topic}".`,
    `Design 5 educational flashcards that clearly explain "${topic}" to a new learner.`,
    `Provide 5 flashcards for someone studying "${topic}" for the first time.`
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
    `Create a multiple-choice quiz with exact 10 questions on the topic: "${topic}".`,
    `Design a beginner-level quiz consisting of exactly 10 MCQs about "${topic}".`,
    `Prepare a quiz of esactly 10 multiple-choice questions for beginners learning "${topic}".`,
    `Generate exactly 10 MCQ-style quiz questions about "${topic}" with explanations.`,
    `You're a helpful tutor. Create exactly 10-question MCQ quiz on "${topic}" with 4 options and a brief explanation for each correct answer.`,
  ];

  const selectedPrompt =
    promptVariants[Math.floor(Math.random() * promptVariants.length)];

  const now = new Date().getTime();

  return `${selectedPrompt}

Each question must follow this format:

Question: [Your question here]
A. [Option A]
B. [Option B]
C. [Option C]
D. [Option D]
Answer: [Correct option letter]
Explanation: [Brief explanation why this option is correct]

✅ Requirements:
- Exactly 10 questions
- 4 distinct options (A to D) for each
- Only **one correct answer per question**
- A short, clear explanation (1–2 lines) for each correct answer
- Keep it simple and beginner-friendly
- Avoid markdown or special formatting

Example:
Question: What does HTML stand for?
A. Hyper Tool Markup Language  
B. Hyperlinks and Text Markup Language  
C. Hyper Text Markup Language  
D. Home Text Machine Language  
Answer: C  
Explanation: HTML stands for Hyper Text Markup Language and is used to structure content on the web.

(seed:${now})`;
};


