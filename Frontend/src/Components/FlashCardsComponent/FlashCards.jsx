import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

const FlashCard = ({ flashCards,onDelete }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="w-full h-52 cursor-pointer mb-4"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-inner w-full h-full relative">
          <div className="flip-card-front bg-neutral text-white p-4 rounded-lg flex flex-col items-center justify-center shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-300 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation() 
                onDelete?.(flashCards._id);
              }}
            >
              <Trash2 size={18} />
            </button>

            <h2 className="text-xl font-semibold text-center mt-2">
              {flashCards?.front}
            </h2>
           
          </div>

          <div className="flip-card-back bg-primary text-white p-4 rounded-lg flex flex-col items-center justify-between shadow-md overflow-hidden">
            <div className="overflow-y-auto max-h-36 w-full text-center px-2">
              <h2 className="text-lg font-normal break-words whitespace-pre-wrap">
                {flashCards?.back}
              </h2>
            </div>
           
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashCard;
