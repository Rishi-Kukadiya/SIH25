import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FacultySidebar from '@/components/FacultySidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardHome from '@/components/DashboardHome';
import ProfilePage from '@/pages/ProfilePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import Timetable from '@/pages/Timetable';
import ShimmerPage from '@/pages/ShimmerPage';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle screen resize safely
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(false); // close overlay sidebar when switching to desktop
      }
    };

    handleResize(); // run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update activeItem based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveItem('dashboard');
    } else if (path.startsWith('/dashboard/profile')) {
      setActiveItem('profile');
    } else if (path.startsWith('/dashboard/courses')) {
      setActiveItem('courses');
    } else if (path.startsWith('/dashboard/performance')) {
      setActiveItem('performance');
    } else if (path.startsWith('/dashboard/attendance')) {
      setActiveItem('attendance');
    } else if (path.startsWith('/dashboard/assignments')) {
      setActiveItem('assignments');
    } else if (path.startsWith('/dashboard/timetable')) {
      setActiveItem('timetable');
    } else if (path.startsWith('/dashboard/achievements')) {
      setActiveItem('achievements');
    } else if (path.startsWith('/dashboard/reports')) {
      setActiveItem('reports');
    }
  }, [location.pathname]);

  // Simulate loading for page transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    
    // Navigate to appropriate route
    switch (itemId) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'profile':
        navigate('/dashboard/profile');
        break;
      case 'courses':
        navigate('/dashboard/courses');
        break;
      case 'performance':
        navigate('/dashboard/performance');
        break;
      case 'attendance':
        navigate('/dashboard/attendance');
        break;
      case 'assignments':
        navigate('/dashboard/assignments');
        break;
      case 'timetable':
        navigate('/dashboard/timetable');
        break;
      case 'achievements':
        navigate('/dashboard/achievements');
        break;
      case 'reports':
        navigate('/dashboard/reports');
        break;
      default:
        navigate('/dashboard');
    }
    
    if (isMobile) setSidebarOpen(false); // auto-close sidebar on mobile after navigation
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    // Show shimmer loading for all pages during transitions
    if (isLoading) {
      return <ShimmerPage />;
    }

    const path = location.pathname;
    
    // Handle specific routes first
    if (path.startsWith('/dashboard/courses/course/')) {
      return <CourseDetailPage />;
    }
    
    if (path.startsWith('/dashboard/courses')) {
      return <CoursesPage />;
    }
    
    if (path.startsWith('/dashboard/profile')) {
      return <ProfilePage />;
    }

    if (path.startsWith('/dashboard/timetable')) {
      return <Timetable />;
    }
    
    // Fall back to state-based rendering for other cases
    switch (activeItem) {
      case 'dashboard':
        return <DashboardHome />;
      case 'profile':
        return <ProfilePage />;
      case 'courses':
        return <CoursesPage />;
      case 'timetable':
        return <Timetable />;
      case 'performance':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Student Performance</h2>
            <p className="text-muted-foreground">Performance analytics coming soon...</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>
            <p className="text-muted-foreground">Attendance tracking coming soon...</p>
          </div>
        );
      case 'assignments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assignments & Exams</h2>
            <p className="text-muted-foreground">Assignment management coming soon...</p>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements Approval</h2>
            <p className="text-muted-foreground">Achievement approvals coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">Detailed reports coming soon...</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <p className="text-muted-foreground">Notification center coming soon...</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <FacultySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      
      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          isMobile ? "ml-0" : "lg:ml-64"
        )}
      >
        {/* Header */}
        <DashboardHeader 
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        
        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
