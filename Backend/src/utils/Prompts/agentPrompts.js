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

export const createFlashCardsPrompt = ({ topic, userId }) => {
  const promptVariants = [
    `User ${userId} is studying the topic "${topic}" and needs flashcards to understand the core concepts.`,
    `Generate 5 helpful flashcards for user ${userId} who is learning about "${topic}". Focus on key concepts only.`,
    `Teach user ${userId} "${topic}" using flashcards that highlight important ideas, definitions, and techniques.`,
    `Create 5 educational flashcards for user ${userId} based on the core lessons of "${topic}". Avoid metadata.`,
    `User ${userId} is learning "${topic}". Generate flashcards that test understanding of its fundamental principles.`,
  ];

  const selectedPrompt =
    promptVariants[Math.floor(Math.random() * promptVariants.length)];

  const now = new Date().getTime();

  return `${selectedPrompt}

The content is based on a lesson about "${topic}". Please **ignore** unrelated sections like:
- Tags
- Resources
- Summary
- Code samples (unless explaining a concept)
- Metadata like estimated time, author info, etc.

Focus only on the **core concepts**, **definitions**, and **key takeaways** from the lesson body.

Each flashcard must follow **exactly** this format (no markdown, no extra formatting):

Front: [Your question or keyword here]  
Back: [A concise and beginner-friendly explanation or answer here]

✅ Use plain text only  
✅ Do NOT use markdown, bullet points, asterisks, or headers  
✅ Focus on essential concepts from the main lesson content  
✅ Skip tags, metadata, and summary unless conceptually important  
✅ Keep explanations short, simple, and clear

Example:
Front: What is data-driven decision making?  
Back: It is the process of using data analysis to guide business or organizational decisions.

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

 