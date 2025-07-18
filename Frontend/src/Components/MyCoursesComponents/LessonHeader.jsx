import { Plus } from "lucide-react";
import React from "react";
import LessonDialog from "../Modal/LessonDialog";

const LessonHeader = ({ name, category }) => {
  const openDialog = () => {
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <div className="flex sticky top-0  z-10 bg-base-100  flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-3xl font-bold text-base-content">{name}</h2>
        <span className="badge badge-primary text-white text-sm">
          {category}
        </span>
      </div>

      <button
        className="btn btn-primary text-white w-full sm:w-auto"
        onClick={openDialog}
      >
        <Plus className="mr-2 hidden md:block" />
        Add New Lesson
      </button>

      {/* Dialog */}
      <LessonDialog />
    </div>
  );
};

export default LessonHeader;
