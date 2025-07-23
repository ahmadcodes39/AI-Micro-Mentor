import { Bot, Sparkles } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const QuizDialog = ({ content, generateQuiz }) => {
  const [topic, setTopic] = useState(content);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTopic(content);
  }, [content]);

  const handleGenerate = async () => {
    setLoading(true);
    await generateQuiz(topic);
    setLoading(false);
    document.getElementById("quiz_modal").close();
  };
  return (
    <div>
      <dialog id="quiz_modal" className="modal">
        <div className="modal-box bg-base-100 text-white max-w-3xl overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">
            <Sparkles className="inline mr-2 text-primary" />
            Generate Quiz for:
            <span className="text-accent">{content}</span>
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
                Generate Quiz
              </>
            )}
          </button>
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

export default QuizDialog;
