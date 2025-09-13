import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCardBorderColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'border-l-4 border-l-green-500';
      case 'upcoming': return 'border-l-4 border-l-blue-500';
      default: return 'border-l-4 border-l-gray-300';
    }
  };

  return (
    <div className={cn(
      "p-6 bg-card rounded-xl border shadow-sm transition-all duration-200",
      "hover:shadow-lg hover:scale-[1.02] hover:border-primary/20",
      getCardBorderColor(lecture.status),
      className
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">
              {lecture.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {lecture.type} • {lecture.subject}
            </p>
          </div>
          
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            getStatusColor(lecture.status)
          )}>
            {lecture.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{lecture.time}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{lecture.students} students</span>
            {lecture.avatars && (
              <div className="flex -space-x-2 ml-2">
                {lecture.avatars.slice(0, 3).map((avatar, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-card flex items-center justify-center text-xs font-medium text-white"
                  >
                    {avatar}
                  </div>
                ))}
                {lecture.avatars.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                    +{lecture.avatars.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{lecture.location || 'Online'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;