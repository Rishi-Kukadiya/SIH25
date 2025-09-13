import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CreditCard, GraduationCap, Calendar } from 'lucide-react';

const CourseCard = ({ 
  courseCode, 
  courseName, 
  credits, 
  semester, 
  academicYear, 
  onViewDetails 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "14px 14px 0px #e5e7eb, 24px 24px 45px rgba(0,0,0,0.06)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl 
                 shadow-[12px_12px_0px_#e5e7eb,20px_20px_40px_rgba(0,0,0,0.05)] 
                 overflow-hidden cursor-pointer flex flex-col"
      onClick={onViewDetails}
    >
      {/* Card Body */}
      <div className="p-4 sm:p-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          {/* Course Code Badge */}
          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {courseCode}
          </div>

          {/* Gradient Icon Circle */}
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow"
          >
            <BookOpen className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-snug mb-4 line-clamp-2">
          {courseName}
        </h3>

        {/* Meta Info */}
        <div className="space-y-3 mb-6 text-sm sm:text-base">
          <div className="flex items-center space-x-2 text-gray-600">
            <CreditCard className="w-4 h-4 text-indigo-500" />
            <span>{credits} Credits</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Semester {semester}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{academicYear}</span>
          </div>
        </div>
      </div>

      {/* Footer Button Strip */}
      <motion.div
        whileHover={{ backgroundColor: "rgb(79,70,229)" }} // slightly lighter hover
        whileTap={{ scale: 0.97 }}
        className="bg-indigo-500 text-white text-center font-medium py-3 sm:py-4 px-4 rounded-b-2xl transition-colors duration-300 text-sm sm:text-base"
      >
        View Details →
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;
