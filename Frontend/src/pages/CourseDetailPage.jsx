import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BookOpen, 
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle
} from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  const [expandedDay, setExpandedDay] = useState(null);

  // Sample course data
  const courseData = {
    1: {
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      credits: 3,
      semester: 1,
      academicYear: '2024-25',
      students: [
        { id: 1, name: 'John Doe', initials: 'JD' },
        { id: 2, name: 'Alice Smith', initials: 'AS' },
        { id: 3, name: 'Mike Johnson', initials: 'MJ' },
        { id: 4, name: 'Sarah Wilson', initials: 'SW' },
        { id: 5, name: 'David Brown', initials: 'DB' },
        { id: 6, name: 'Emma Davis', initials: 'ED' }
      ],
      attendance: [
        {
          date: '2024-09-01',
          classes: [
            {
              classId: 1,
              subject: 'Lecture - Programming Fundamentals',
              students: [
                { id: 1, name: 'John Doe', initials: 'JD', status: 'Present' },
                { id: 2, name: 'Alice Smith', initials: 'AS', status: 'Absent' },
              ]
            },
            {
              classId: 2,
              subject: 'Lab - Data Structures',
              students: [
                { id: 1, name: 'John Doe', initials: 'JD', status: 'Present' },
                { id: 3, name: 'Mike Johnson', initials: 'MJ', status: 'Present' },
              ]
            }
          ]
        }
      ]
      ,
      assignments: [
        { id: 1, title: 'Programming Assignment 1', status: 'Pending', dueDate: '2024-10-15' },
        { id: 2, title: 'Data Structures Project', status: 'Submitted', dueDate: '2024-10-10' },
        { id: 3, title: 'Algorithm Analysis', status: 'Pending', dueDate: '2024-10-20' }
      ],
      exams: [
        { id: 1, type: 'Midterm', subject: 'Programming Fundamentals', date: '2024-11-15', time: '10:00 AM' },
        { id: 2, type: 'Final', subject: 'Complete Course', date: '2024-12-20', time: '2:00 PM' }
      ]
    }
  };

  const course = courseData[id] || courseData[1];
  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarDays },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: BookOpen }
  ];

  const renderStudents = () => (
    <motion.div
      key="students"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Students ({course.students.length})
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {course.students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold cursor-pointer">
              {student.initials}
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {student.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderAttendance = () => (
    <motion.div
      key="attendance"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Class-wise Attendance</h3>
      </div>
  
      {/* Loop over dates */}
      {course.attendance.map((day) => (
        <div key={day.date} className="space-y-4">
          <h4 className="font-medium text-gray-800">{day.date}</h4>
  
          {/* Loop over classes for this date */}
          {day.classes.map((cls) => (
            <div key={cls.classId} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h5 className="font-semibold text-indigo-600 mb-3">{cls.subject}</h5>
  
              {/* Student list for this class */}
              {cls.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-2 border-b last:border-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                      {student.initials}
                    </div>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
  
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Present'
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Absent'
                          ? 'bg-red-500 text-white'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
  
      <div className="flex justify-end mt-6">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
          Save Attendance
        </button>
      </div>
    </motion.div>
  );
  

  const renderAssignments = () => (
    <motion.div
      key="assignments"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Assignments</h3>
      </div>
      
      {course.assignments.map((assignment) => (
        <motion.div
          key={assignment.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
              <div>
                <div className="font-medium text-gray-900">{assignment.title}</div>
                <div className="text-sm text-gray-600">Due: {assignment.dueDate}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${
              assignment.status === 'Submitted' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {assignment.status}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderExams = () => (
    <motion.div
      key="exams"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Exams</h3>
      </div>
      
      {course.exams.map((exam) => (
        <motion.div
          key={exam.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
              <div>
                <div className="font-medium text-gray-900">{exam.subject}</div>
                <div className="text-sm text-gray-600">{exam.type}</div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-sm font-medium text-gray-900">{exam.date}</div>
              <div className="text-sm text-gray-600">{exam.time}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return renderStudents();
      case 'attendance':
        return renderAttendance();
      case 'assignments':
        return renderAssignments();
      case 'exams':
        return renderExams();
      default:
        return renderStudents();
    }
  };

  return (
    <div className="p-4 sm:p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/courses')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{course.courseName}</h1>
                <p className="text-sm sm:text-base text-gray-600">{course.courseCode}  {course.credits} Credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="p-4">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-3 border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id 
                        ? 'border-indigo-500 text-indigo-600' 
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 flex-1 ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
