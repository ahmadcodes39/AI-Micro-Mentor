import React from 'react'
import { Book, Clock, Tag } from 'lucide-react'
import moment from 'moment' // Make sure moment is installed

const IndividualLessonHeader = ({
  title = "Understanding Java Backend Development",
  courseName = "Java Backend",
  duration = 5,
  tags = ["java", "backend", "spring boot"],
  createdAt = new Date().toISOString(),
}) => {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md space-y-3">
      {/* Title */}
      <div className="flex items-center gap-2 text-2xl font-bold text-base-content">
        <Book className="w-6 h-6 text-primary" />
        {title}
      </div>

      {/* Meta info */}
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

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span key={i} className="badge badge-primary badge-outline flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default IndividualLessonHeader
