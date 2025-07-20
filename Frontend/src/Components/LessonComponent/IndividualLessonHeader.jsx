import React, { useState } from "react";
import { Book, Clock, Tag } from "lucide-react";
import moment from "moment";

const IndividualLessonHeader = ({
  title,
  courseName,
  duration = 5,
  tags,
  createdAt,
}) => {
  const [activeTab, setActiveTab] = useState("Tab 1");

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 text-2xl font-bold text-base-content">
        <Book className="w-6 h-6 text-primary" />
        {title}
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
        <span>
          <strong>Course:</strong> {courseName}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration} min
        </span>
        <span>
          <strong>Created:</strong> {moment(createdAt).fromNow()}
        </span>
      </div>

      {/* Tags + Tabs Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="badge badge-primary badge-outline flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="pt-2">
          <div role="tablist" className="tabs tabs-boxed border-gray-400 border-2">
            {["Tab 1", "Tab 2", "Tab 3"].map((tab) => (
              <button
                key={tab}
                role="tab"
                className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualLessonHeader;
