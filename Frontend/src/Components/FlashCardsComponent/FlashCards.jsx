import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

const FlashCard = ({ flashCards }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="w-full h-52 cursor-pointer mb-4"
      whileHover={{ y: -8 }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-inner w-full h-full relative">
          <div className="flip-card-front bg-neutral text-white p-4 rounded-lg flex flex-col items-center justify-center shadow-md relative">
            <button className="absolute top-2 right-2 text-red-300 hover:text-red-400">
              <Trash2 size={18} />
            </button>

            <h2 className="text-xl font-bold text-center mt-2">
              {flashCards?.front}
            </h2>
            <button className="btn btn-sm btn-accent btn-outline text-sm text-white mt-2">
              <Eye />
              Reveal answer
            </button>
          </div>

          <div className="flip-card-back bg-primary text-white p-4 rounded-lg flex flex-col items-center justify-center shadow-md">
            <h2 className="text-xl font-bold text-center">
               {flashCards?.back}
            </h2>
            <button className="btn btn-sm btn-outline btn-white text-white mt-2">
              <Eye className="w-4 h-4 mr-1" />
              Back to question
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashCard;
