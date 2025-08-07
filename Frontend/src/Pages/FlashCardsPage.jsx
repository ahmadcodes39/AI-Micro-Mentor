import React, { useEffect, useState } from "react";
import LessonTopBar from "../Components/LessonTopBar";
import FlashCards from "../Components/FlashCardsComponent/FlashCards";
import FlashCardDialog from "../Components/Modal/FlashCardDialog";
import { useParams } from "react-router";
import {
  deleteFlashCard,
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
  const [cardTopic, setCardTopic] = useState("");

  useEffect(() => {
    if (!lessonContent) return;
    const getFlashCards = async () => {
      try {
        setLoading(true);
        const response = await getUserFlashCards(courseId, lessonId);
        if (!response.cards || response.cards.length === 0) {
         const generated = await generateInitialFlashCards(courseId, lessonId, lessonContent?.content);

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

  const generateUserFlashCard = async (topic) => {
    if (topic == null || topic == "") {
      topic = cardTopic;
    }
    const generated = await generateInitialFlashCards(
      courseId,
      lessonId,
      topic
    );
    if (generated) {
      setFlashCards(generated.cards);
      toast.success(generated.message);
    } else {
      toast.error(generated.message);
    }
    const response = await getUserFlashCards(courseId, lessonId);
    if (response) {
      setFlashCards(response.cards);
    }
  };
  const handleGenerateClick = () => {
    document.getElementById("flashCard").showModal();
  };

  const handleLessonContent = (lesson) => {
    setLessonContent(lesson);
    setCardTopic(lesson?.title);

  };
  const handleDeleteCard = async (id) => {
    const response = await deleteFlashCard(id);
    if (response) {
      setFlashCards((prev) => prev.filter((card) => card._id !== id));
      toast.success(response.message);
    } else {
      toast.error(response?.message || "Failed to delete flashcard");
    }
  };

  return (
    <div>
      <LessonTopBar onLessonLoaded={handleLessonContent} />

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

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4 md:p-0 sm:p-2 p-3 sm:pb-0 pb-24">
            {flashCards.map((card, index) => (
              <FlashCards
                key={index}
                flashCards={card}
                onDelete={() => handleDeleteCard(card?._id)}
              />
            ))}
          </div>
        </div>
      )}
      <FlashCardDialog
        generateUserFlashCard={generateUserFlashCard}
        content={cardTopic}
      />
    </div>
  );
};

export default FlashCardsPage;
