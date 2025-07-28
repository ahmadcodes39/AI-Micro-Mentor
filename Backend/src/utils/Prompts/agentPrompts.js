export const createLessonPrompt = ({ topic, courseName, userId }) => {
  const phrasingVariants = [
    `User ${userId} needs a beginner-friendly lesson on "${topic}" for ${courseName}.`,
    `Teach user ${userId}, who is new to "${topic}", in ${courseName}.`,
    `Design a personalized programming lesson on "${topic}" in ${courseName} for user ${userId}.`,
    `Prepare a learning module about "${topic}" in ${courseName} for user ${userId}.`,
    `As an expert teacher, create a lesson on "${topic}" in ${courseName} specifically for user ${userId}.`,
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

## Examples
If the topic involves technical or programming concepts, include one or two **code examples** with explanation.  
Otherwise, provide **practical, real-world examples** relevant to the subject.


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

(seed:${now}-user:${userId})`
  );
};

export const createInitialLessonPrompt = ({ topic,userId }) => {
  const phrasingVariants = [
    `User ${userId} needs a beginner-friendly lesson on "${topic}" .`,
    `Teach user ${userId}, who is new to "${topic}".`,
    `Design a personalized programming lesson on "${topic}" for user ${userId}.`,
    `Prepare a learning module about "${topic}"  for user ${userId}.`,
    `As an expert teacher, create a lesson on "${topic}" specifically for user ${userId}.`,
  ];

  const selected =
    phrasingVariants[Math.floor(Math.random() * phrasingVariants.length)];

  const now = new Date().getTime();

  return `${selected}.

### Please include the following sections clearly:

# [Your Title Here]

## Introduction
Write a clear and concise intro to the topic.

## Key Concepts
- List important concepts as bullet points.

## Examples
If the topic involves technical or programming concepts, include one or two **code examples** with explanation.  
Otherwise, provide **practical, real-world examples** relevant to the subject.


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

(seed:${now}-user:${userId})`
};

export const createFlashCardsPrompt = ({ topic,userId }) => {
  const promptVariants = [
    `User ${userId} needs a beginner-friendly set of flashcards on "${topic}".`,
    `Teach user ${userId}, who is new to "${topic}", using 5 clear flashcards.`,
    `Design 5 personalized flashcards on "${topic}" specifically for user ${userId}.`,
    `Prepare a learning set of flashcards about "${topic}" for user ${userId}.`,
    `As an expert, create 5 simple and helpful flashcards on "${topic}" for user ${userId}.`,
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

export const createQuizPrompt = ({ topic,userId }) => {
  const promptVariants = [
    `User ${userId} needs a multiple-choice quiz with exactly 10 questions on the topic "${topic}". Also provide a suitable quiz title.`,
    `Design a beginner-level quiz of exactly 10 MCQs about "${topic}" specifically for user ${userId}, and include a title.`,
    `Prepare a quiz of exactly 10 multiple-choice questions for user ${userId} who is learning "${topic}". Add a quiz title.`,
    `Generate exactly 10 MCQ-style quiz questions about "${topic}" for user ${userId}, each with explanations. Start with a quiz title.`,
    `As a helpful tutor, create a 10-question MCQ quiz on "${topic}" for user ${userId}", including 4 options per question, short explanations, and a suitable title.`,
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

 