import React, { useState } from "react";

const LessonDialog = () => {
  const [lessonTitle, setLessonTitle] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    console.log("Creating lesson by agent:", lessonTitle);
    // TODO: Call your agent or API here
    setLessonTitle("");
    document.getElementById("my_modal_2").close();
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-base-100 text-white">
        <h3 className="font-bold text-xl mb-4">Create New Lesson</h3>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="label text-white font-medium">Lesson Title</label>
            <input
              type="text"
              name="lessonTitle"
              placeholder="Enter lesson title"
              className="input input-bordered w-full bg-base-300 text-white"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              required
            />
          </div>

          <div className="modal-action flex justify-end gap-2">
            <form method="dialog">
              <button className="btn btn-outline">Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary text-white">
              Create Lesson by Agent
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LessonDialog;
