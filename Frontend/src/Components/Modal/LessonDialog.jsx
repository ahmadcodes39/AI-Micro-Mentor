import React, { useState } from "react";
import { addLesson } from "../API/lessonApi";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Bot } from "lucide-react";

const LessonDialog = ({refreshLessons,name}) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const courseName = name
  

  const handleCreate = async (e) => {
    e.preventDefault();
    // console.log("ID ",courseId)
    // console.log("Course Name ",courseName)
    // console.log("lesson Title ",lessonTitle)
    setLoading(true);
    if (!lessonTitle.trim()) return;
    const response = await addLesson(courseId, lessonTitle,courseName);
    if (response) {
      toast.success(response.message);
      // console.log(response);
    }
    setLessonTitle("");
    setLoading(false);
    document.getElementById("my_modal_2").close();
    refreshLessons()
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
              <button className="btn btn-outline" disabled={loading}>Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary text-white">
              {loading ? (
                <div className="flex items-center justify-center gap-1">
                  <Bot className="h-6 w-6 text-white animate-bounce" />
                  <p>creating...</p>
                </div>
              ) : (
                "Create Lesson by Agent"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LessonDialog;
