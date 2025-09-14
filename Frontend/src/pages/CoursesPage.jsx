import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const capitalized = (str) => {
  return str
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CoursesPage = ({ data }) => {
  const navigate = useNavigate();
  const courses = data.courses.map((c) => {
    return {
      id : c._id,
      courseCode: (c.course.courseCode),
      courseName: capitalized(c.course.courseName),
      credits: (c.course.credits),
      semester: (c.semester),
      academicYear: c.academicYear,
    };
  });


  const handleViewDetails = (courseId) => {
    navigate(`/dashboard/courses/course/${courseId}`);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and view details of your assigned courses
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <CourseCard
                courseCode={course.courseCode}
                courseName={course.courseName}
                credits={course.credits}
                semester={course.semester}
                academicYear={course.academicYear}
                onViewDetails={() => handleViewDetails(course.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;
