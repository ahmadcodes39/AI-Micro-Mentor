import { Trash2Icon } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const IndividualLessonDetails = ({ content }) => {
  return (
    <div className="flex flex-col gap-4 mt-6 overflow-hidden">
      {/* Markdown content */}
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-base-content leading-relaxed pb-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Delete button aligned to the right */}
      <div className="flex justify-end pb-5 mr-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1,y:-4 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm text-white btn-error flex items-center gap-1"
          >
            <Trash2Icon className="size-4" />
            Delete Lesson
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IndividualLessonDetails;
