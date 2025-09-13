import React from 'react';
import { Clock, Users, MapPin, Calendar, BookOpen, BarChart2, Star, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './Skeleton';

const LectureCard = ({ lecture, isLoading = false, className }) => {
  if (isLoading) {
    return (
      <div className={cn("p-6 bg-card rounded-xl border shadow-sm", className)}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton height="20px" width="70%" />
              <Skeleton height="16px" width="50%" />
            </div>
            <Skeleton width="60px" height="24px" borderRadius="12px" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton shape="circle" width="16px" height="16px" />
              <Skeleton height="14px" width="80px" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton shape="circle" width="16px" height="16px" />
              <Skeleton height="14px" width="60px" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton shape="circle" width="16px" height="16px" />
              <Skeleton height="14px" width="90px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get status badge color based on day or other logic
  const getStatusColor = (day) => {
    switch (day?.toLowerCase()) {
      case 'mon': return 'bg-green-100 text-green-800';
      case 'tue': return 'bg-blue-100 text-blue-800';
      case 'wed': return 'bg-purple-100 text-purple-800';
      case 'thu': return 'bg-yellow-100 text-yellow-800';
      case 'fri': return 'bg-pink-100 text-pink-800';
      case 'sat': return 'bg-orange-100 text-orange-800';
      case 'sun': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardBorderColor = (day) => {
    switch (day?.toLowerCase()) {
      case 'mon': return 'border-l-4 border-green-500';
      case 'tue': return 'border-l-4 border-blue-500';
      case 'wed': return 'border-l-4 border-purple-500';
      case 'thu': return 'border-l-4 border-yellow-500';
      case 'fri': return 'border-l-4 border-pink-500';
      case 'sat': return 'border-l-4 border-orange-500';
      case 'sun': return 'border-l-4 border-gray-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  const formattedAttendance = lecture.avgAttendance !== undefined
    ? `${lecture.avgAttendance.toFixed(1)}%`
    : 'N/A';
  const formattedMarks = lecture.avgMarks !== undefined
    ? `${lecture.avgMarks.toFixed(1)}`
    : 'N/A';

  return (
    <div className={cn(
      "p-6 bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
      getCardBorderColor(lecture.day),
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-xl text-foreground mb-1">{lecture.courseName}</h3>
          <p className="text-sm text-muted-foreground">
            * {lecture.courseCode}
            <br></br> 
            * {lecture.credits} Credits
          </p>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
          getStatusColor(lecture.day)
        )}>
          {lecture.day || 'N/A'}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Room : {lecture.room || 'Online'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{lecture.time || 'TBD'} PM</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>AcademicYear : {lecture.academicYear || 'Unknown Year'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{lecture.studentsCount} students</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-4 w-4 text-primary" />
            <span>Avg Attendance: {formattedAttendance}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-primary" />
            <span>Avg Marks: {formattedMarks}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-primary" />
            <span>Semester: {lecture.semester || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;
