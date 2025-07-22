import React, { useEffect, useState } from "react";
import LessonTopBar from "../Components/LessonTopBar";
import FlashCards from "../Components/FlashCardsComponent/FlashCards";
import FlashCardDialog from "../Components/Modal/FlashCardDialog";
import { useParams } from "react-router";
import {
  generateInitialFlashCards,
  getUserFlashCards,
} from "../Components/API/flashCardsApi";
import toast from "react-hot-toast";
import { Bot } from "lucide-react";

const FlashCardsPage = () => {
  const [lessonContent, setLessonContent] = useState("");
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId, lessonId } = useParams();

  useEffect(() => {
    if (!lessonContent) return;

    const getFlashCards = async () => {
      try {
        setLoading(true);

        const response = await getUserFlashCards(courseId, lessonId);
        console.log("response from component ", response.cards);
        if (!response.cards || response.cards.length === 0) {
          const generated = await generateInitialFlashCards(
            courseId,
            lessonId,
            lessonContent
          );
          if (generated) {
            setFlashCards(generated.cards);
            toast.success("Flashcards generated successfully");
          }
        } else {
          setFlashCards(response.cards);
        }
      } catch (err) {
        toast.error("Error loading flashcards", err);
      } finally {
        setLoading(false);
      }
    };

    getFlashCards();
  }, [lessonContent, courseId, lessonId]);

  const handleGenerateClick = () => {
    document.getElementById("flashCard").showModal();
  };
  console.log("flash cards from component ",flashCards)

  return (
    <div>
      <LessonTopBar
        onLessonLoaded={(lesson) => setLessonContent(lesson.content)}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 p-8 bg-base-200 rounded-lg shadow mt-6">
          <Bot className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-white text-lg font-medium">
            Agent is creating flashcards. Please wait...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center mb-4 mt-4">
            <button
              onClick={handleGenerateClick}
              className="btn btn-sm btn-outline btn-accent mr-4"
            >
              ✨ Generate Flashcards
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4 ">
            {flashCards.map((card, index) => (
              <FlashCards key={index} flashCards={card} />
            ))}
          </div>
        </div>
      )}

      <FlashCardDialog content={lessonContent} />
    </div>
  );
};

export default FlashCardsPage;
