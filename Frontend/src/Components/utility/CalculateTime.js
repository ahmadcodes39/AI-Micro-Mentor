export const customsReadingTime = (text) => {
  const wordCount = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // average adult reading speed
  const readingTime = wordCount / wordsPerMinute;
  return Math.ceil(readingTime);
}
