import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FacultySidebar from "../Components/FacultySidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardHome from "../Components/DashboardHome";
import ProfilePage from "@/pages/ProfilePage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import Timetable from "@/pages/Timetable";
import ShimmerPage from "@/pages/ShimmerPage";
import { Popup } from "../Components/ui/popup";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { facultydata } from "../Slices/DashBoard/FacultyData.js";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errors, setErrors] = useState("");

  const user = sessionStorage.getItem("auth");
  useEffect(() => {
    if (user == null) {
      navigate("/login", { state: { errors: "Please Login!!" } });
    }
  }, [user, navigate]);

  const message = location.state?.message || "";

  const [dashboardData, setDashboardData] = useState(location.state?.data || null);

useEffect(() => {
  if (!dashboardData) {
    dispatch(facultydata())
      .unwrap()
      .then((res) => {
        setDashboardData(res.data); // update state when data is fetched
      })
      .catch((err) => {
        setErrors(err);
        setShowErrorPopup(true);
      });
  }
}, [dashboardData, dispatch]);


  useEffect(() => {
    if (message) {
      setShowSuccessPopup(true);
    }
  }, []);

  if (!user) {
    return (
      <>
        <p>Redirect to Login!!</p>
      </>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setActiveItem("dashboard");
    } else if (path.startsWith("/dashboard/profile")) {
      setActiveItem("profile");
    } else if (path.startsWith("/dashboard/courses")) {
      setActiveItem("courses");
    } else if (path.startsWith("/dashboard/performance")) {
      setActiveItem("performance");
    } else if (path.startsWith("/dashboard/attendance")) {
      setActiveItem("attendance");
    } else if (path.startsWith("/dashboard/assignments")) {
      setActiveItem("assignments");
    } else if (path.startsWith("/dashboard/timetable")) {
      setActiveItem("timetable");
    } else if (path.startsWith("/dashboard/achievements")) {
      setActiveItem("achievements");
    } else if (path.startsWith("/dashboard/reports")) {
      setActiveItem("reports");
    }
  }, [location.pathname]);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    switch (itemId) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "profile":
        navigate("/dashboard/profile");
        break;
      case "courses":
        navigate("/dashboard/courses");
        break;
      case "performance":
        navigate("/dashboard/performance");
        break;
      case "attendance":
        navigate("/dashboard/attendance");
        break;
      case "assignments":
        navigate("/dashboard/assignments");
        break;
      case "timetable":
        navigate("/dashboard/timetable");
        break;
      case "achievements":
        navigate("/dashboard/achievements");
        break;
      case "reports":
        navigate("/dashboard/reports");
        break;
      default:
        navigate("/dashboard");
    }

    if (isMobile) setSidebarOpen(false); // auto-close sidebar on mobile after navigation
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    if (!dashboardData) {
      return <ShimmerPage />;
    }
    const path = location.pathname;
    if (path.startsWith("/dashboard/courses/course/")) {
      return <CourseDetailPage data={dashboardData} />;
    }

    if (path.startsWith("/dashboard/courses")) {
      return <CoursesPage data={dashboardData} />;
    }

    if (path.startsWith("/dashboard/profile")) {
      return <ProfilePage data={dashboardData} />;
    }

    if (path.startsWith("/dashboard/timetable")) {
      return <Timetable data={dashboardData} />;
    }

    switch (activeItem) {
      case "dashboard":
        return <DashboardHome data={dashboardData} />;
      case "profile":
        return <ProfilePage data={dashboardData} />;
      case "courses":
        return <CoursesPage data={dashboardData} />;
      case "timetable":
        return <Timetable data={dashboardData} />;
      case "performance":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Student Performance</h2>
            <p className="text-muted-foreground">
              Performance analytics coming soon...
            </p>
          </div>
        );
      case "attendance":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>
            <p className="text-muted-foreground">
              Attendance tracking coming soon...
            </p>
          </div>
        );
      case "assignments":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assignments & Exams</h2>
            <p className="text-muted-foreground">
              Assignment management coming soon...
            </p>
          </div>
        );
      case "achievements":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements Approval</h2>
            <p className="text-muted-foreground">
              Achievement approvals coming soon...
            </p>
          </div>
        );
      case "reports":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">
              Detailed reports coming soon...
            </p>
          </div>
        );
      case "notifications":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <p className="text-muted-foreground">
              Notification center coming soon...
            </p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FacultySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />

      <div
        className={cn(
          "transition-all duration-300",
          isMobile ? "ml-0" : "lg:ml-64"
        )}
      >
        {/* Header */}
        <DashboardHeader onToggleSidebar={toggleSidebar} isMobile={isMobile}  />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-muted/30">
          {renderContent()}
        </main>
      </div>

      {showSuccessPopup && (
        <Popup
          type="success"
          message={message || "Login successfully!"}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && (
        <Popup
          type="error"
          message={errors || "Something went wrong!"}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
