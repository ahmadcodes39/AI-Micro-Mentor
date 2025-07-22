import React, { useState } from "react";
import { Sparkles, Bot } from "lucide-react";

const FlashCardDialog = ({ lessonTitle = "JavaScript Basics", onGenerate }) => {
  const [topic, setTopic] = useState(lessonTitle);
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setFlashcards([]);

    // Simulate agent call
    setTimeout(() => {
      const mockCards = [
        {
          question: "What is JavaScript?",
          answer: "A programming language used primarily for web development.",
        },
        
      ];
      setFlashcards(mockCards);
      setLoading(false);
      if (onGenerate) onGenerate();
    }, 2000);
  };

  return (
    <div>
      <dialog id="flashCard" className="modal">
        <div className="modal-box bg-base-100 text-white max-w-3xl overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">
            <Sparkles className="inline mr-2 text-primary" />
            Generate Flashcards for:{" "}
            <span className="text-accent">{lessonTitle}</span>
          </h3>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="input input-bordered bg-base-200 text-white"
              placeholder="Enter topic for flashcards"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Bot className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Flashcards
              </>
            )}
          </button>

          {/* Flashcards Preview */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-56 pr-2">
            {flashcards.map((card, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-lg p-4 shadow-md border border-primary/20"
              >
                <h4 className="font-semibold mb-2 text-primary">
                  Q: {card.question}
                </h4>
                <p className="text-gray-300">A: {card.answer}</p>
              </div>
            ))}
          </div>

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FlashCardDialog;
