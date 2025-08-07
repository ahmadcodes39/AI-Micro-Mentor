import { BadgeCheck, Trash2Icon } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const IndividualLessonDetails = ({
  content,
  handleDoneLesson,
  isComplete,
  handleDeleteLesson,
  isDelete,
}) => {
  return (
    <div className="md:p-0 px-6 flex flex-col gap-4 mt-6 overflow-hidden">
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-base-content leading-relaxed pb-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="flex justify-end pb-5 mr-4 gap-4 md:mb-0  mb-24">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`btn btn-sm text-white btn-success flex items-center gap-1 
    ${isComplete ? "opacity-60 cursor-not-allowed" : ""}`}
            onClick={!isComplete ? handleDoneLesson : undefined}
          >
            <BadgeCheck className="size-4" />
            {isComplete ? "Completed" : "Mark Done"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm text-white btn-error flex items-center gap-1"
            onClick={handleDeleteLesson}
          >
            <Trash2Icon className="size-4" />
            {isDelete ? (
              <>
                Deleting
                <span className="loading loading-spinner text-white"></span>
              </>
            ) : (
              "Delete Lesson"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IndividualLessonDetails;
