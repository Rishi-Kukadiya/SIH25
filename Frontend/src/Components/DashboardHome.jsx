import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LectureCard from './LectureCard';
import ProfilePanel from './ProfilePanel';
import { SkeletonCard } from './Skeleton';
import { BookOpen, Users, CheckCircle, Award } from "lucide-react";

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalExams, setTotalExams] = useState(0);

  const sampleLectures = [
    { id: 1, title: 'UX Research Class', type: 'Lecture', subject: 'Assignment', time: '10:44 am', students: 45, status: 'upcoming', location: 'Room 204', avatars: ['JD', 'AS', 'MK', 'RT', 'NG'] },
    { id: 2, title: 'App Development Course', type: 'Report', subject: 'Classroom', time: '10:44 am', students: 32, status: 'ongoing', location: 'Lab 3', avatars: ['AB', 'CD', 'EF'] },
    { id: 3, title: 'Figma UI/UX Workshop', type: 'Lecture', subject: 'Evaluation', time: '10:44 am', students: 28, status: 'upcoming', location: 'Design Studio', avatars: ['GH', 'IJ', 'KL', 'MN'] },
    { id: 4, title: 'Advanced React Session', type: 'Lecture', subject: 'Workshop', time: '2:00 pm', students: 30, status: 'upcoming', location: 'Lab 1', avatars: ['OP', 'QR'] }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const simulateFetch = setTimeout(() => {
      setCourses([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
      setStudents(Array.from({ length: 120 }, (_, i) => ({ id: i + 1 })));
      setTotalAttendance(860);
      setTotalClasses(1000);
      setTotalMarks(7450);
      setTotalExams(9200);
    }, 300);
    return () => clearTimeout(simulateFetch);
  }, []);

  const StatsGridSection = () => {
    const courseCount = courses.length;
    const studentCount = students.length;
    const avgAttendance = totalClasses > 0 ? Math.min(100, Math.max(0, (totalAttendance / totalClasses) * 100)) : 0;
    const avgMarks = totalExams > 0 ? Math.min(100, Math.max(0, (totalMarks / totalExams) * 100)) : 0;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Course Count */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Course Count</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{courseCount}</div>
          </CardContent>
        </Card>

        {/* Student Count */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Student Count</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{studentCount}</div>
          </CardContent>
        </Card>

        {/* Avg Attendance */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Avg Attendance</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-3">{avgAttendance.toFixed(1)}%</div>
            <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
              <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${avgAttendance}%` }} />
            </div>
          </CardContent>
        </Card>

        {/* Avg Marks */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Avg Marks</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-3">{avgMarks.toFixed(1)}%</div>
            <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${avgMarks}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const YourLecturesSection = () => {
    const containerRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('auto');
    const [enableScroll, setEnableScroll] = useState(false);
    const [scrolling, setScrolling] = useState(false);
  
    useEffect(() => {
      if (containerRef.current) {
        const children = Array.from(containerRef.current.children);
        if (children.length > 3) {
          const height =
            children.slice(0, 3).reduce((acc, child) => acc + child.offsetHeight, 0) + 16; // spacing
          setMaxHeight(height);
          setEnableScroll(true);
        } else {
          setMaxHeight('auto');
          setEnableScroll(false);
        }
      }
    }, [sampleLectures, isLoading]);
  
    // Handle scroll visibility
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setScrolling(false), 1000);
    };
  
    const scrollTimeout = useRef();
  
    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Your Lectures</CardTitle>
            <span className="text-sm text-muted-foreground">This Week</span>
          </div>
        </CardHeader>
        <CardContent className="relative overflow-x-hidden">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className={`space-y-4 transition-all duration-300 overflow-y-auto pr-2 scroll-container`}
            style={{ maxHeight }}
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
              : sampleLectures.map((lecture) => (
                  <LectureCard
                    key={lecture.id}
                    lecture={lecture}
                    className="transform transition-all duration-200 hover:scale-[1.0001]"
                  />
                ))}
          </div>
        </CardContent>
  
        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            width: 8px;
            transition: opacity 0.3s;
            opacity: ${scrolling ? 1 : 0};
          }
  
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: rgba(100, 100, 100, 0.5);
            border-radius: 4px;
          }
  
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }
  
          /* Firefox */
          .scroll-container {
            scrollbar-width: thin;
            scrollbar-color: rgba(100, 100, 100, 0.5) transparent;
          }
  
          /* Hide scrollbar by default on Firefox */
          .scroll-container:not(:hover) {
            scrollbar-color: transparent transparent;
          }
        `}</style>
      </Card>
    );
  };
  
  
  
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <StatsGridSection />
          <YourLecturesSection />
        </div>
        <div className="xl:col-span-1">
          <ProfilePanel isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
