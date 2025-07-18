import { GraduationCap, GraduationCapIcon } from "lucide-react";

const NoCoursesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center ">
      <div className="bg-base-300 p-6 rounded-full mb-4">
        <GraduationCap className="w-12 h-12 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold text-base-content mb-2">No Courses Found</h2>
      <p className="text-sm text-gray-400 mb-6 max-w-md">
        You haven’t created any courses yet. Start by adding your first course and begin building your learning journey.
      </p>
    </div>
  );
};

export default NoCoursesFound;
